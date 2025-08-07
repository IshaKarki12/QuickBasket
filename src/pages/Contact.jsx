function Contact() {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '20px', border: '1px solid #eee', borderRadius: 8 }}>
      <h1>Contact Us</h1>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label><br />
          <input type="text" placeholder="Your Name" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label><br />
          <input type="email" placeholder="Your Email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Message:</label><br />
          <textarea placeholder="Your Message" rows={5} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <button type="button" style={{ padding: '10px 24px', borderRadius: 4, background: '#007bff', color: '#fff', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
