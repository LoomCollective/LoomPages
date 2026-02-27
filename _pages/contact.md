---
layout: page
title: Contact
permalink: /contact/
---

<style>
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; max-width: 520px; margin-top: 1.5rem; }
.contact-form__field { display: flex; flex-direction: column; gap: 0.375rem; }
.contact-form label { font-size: 0.875rem; font-weight: 500; color: var(--text); }
.contact-form input, .contact-form textarea { padding: 0.625rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius, 6px); background: var(--bg); color: var(--text); font-family: var(--font-sans); font-size: 0.9375rem; outline: none; transition: border-color 0.15s; width: 100%; box-sizing: border-box; }
.contact-form input:focus, .contact-form textarea:focus { border-color: var(--accent); }
.contact-form textarea { resize: vertical; min-height: 140px; }
</style>

For discussion on published essays, comments are open on individual posts. For everything else — collaborations, corrections, or general correspondence — use the form below.

You can also reach us on [GitHub](https://github.com/LoomCollective).

<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="hidden" name="_site" value="Loom Collective">
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">

  <div class="contact-form__field">
    <label for="cf-name">Name</label>
    <input type="text" id="cf-name" name="name" required autocomplete="name" placeholder="Your name">
  </div>

  <div class="contact-form__field">
    <label for="cf-email">Email</label>
    <input type="email" id="cf-email" name="email" required autocomplete="email" placeholder="you@example.com">
  </div>

  <div class="contact-form__field">
    <label for="cf-message">Message</label>
    <textarea id="cf-message" name="message" rows="6" required placeholder="What's on your mind?"></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Send message</button>
</form>
