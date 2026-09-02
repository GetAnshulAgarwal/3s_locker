require('dotenv').config();

const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ ok: false, error: 'Too many submissions. Please try again later.' });
    }

    const { name, email, phone, message, company } = req.body || {};

    // Honeypot field: bots fill every field, real users never see/fill "company".
    if (company) {
      return res.json({ ok: true });
    }

    if (!name || !String(name).trim()) {
      return res.status(400).json({ ok: false, error: 'Name is required.' });
    }
    if (!email || !EMAIL_RE.test(String(email).trim())) {
      return res.status(400).json({ ok: false, error: 'A valid email is required.' });
    }
    if (!message || !String(message).trim()) {
      return res.status(400).json({ ok: false, error: 'Message is required.' });
    }

    if (!process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_KEY) {
      console.error('Brevo SMTP credentials are not configured in .env');
      return res.status(500).json({ ok: false, error: 'Email service is not configured yet. Please call us instead.' });
    }

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || '3ssafestorage@gmail.com',
      replyTo: String(email).trim(),
      subject: `New enquiry from ${String(name).trim()} — 3S Safe Storage Solutions`,
      text: [
        `Name: ${String(name).trim()}`,
        `Email: ${String(email).trim()}`,
        `Phone: ${phone ? String(phone).trim() : 'Not provided'}`,
        '',
        'Message:',
        String(message).trim()
      ].join('\n'),
      html: `
        <h2>New enquiry — 3S Safe Storage Solutions</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ ok: false, error: 'Something went wrong sending your message. Please try again or call us directly.' });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.listen(PORT, () => {
  console.log(`3S Safe Storage Solutions site running at http://localhost:${PORT}`);
});
