import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About myNotebook</h1>
      <p>
        Welcome to myNotebook, your all-in-one solution for note-taking and task management. Whether you're a student, a professional, or someone who loves to stay organized, myNotebook is designed to help you capture, organize, and manage your thoughts and tasks effortlessly.
      </p>

      <hr />

      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          At myNotebook, our mission is to provide a seamless and user-friendly platform that empowers you to take control of your notes and to-do lists. We believe that keeping your thoughts and tasks organized should be simple and intuitive, allowing you to focus on what matters most.
        </p>
      </div>

      <div className="features">
        <h2>Key Features</h2>
        <h3>Effortless Note-Taking</h3>
        <p>
          myNotebook allows you to create and manage notes with ease. Whether you’re jotting down quick thoughts, capturing meeting minutes, or writing detailed essays, our platform offers a clean and distraction-free environment to get your ideas down.
        </p>

        <h3>To-Do Lists</h3>
        <p>
          Stay on top of your tasks with our integrated to-do list feature. Create tasks, set deadlines, and check them off as you complete them. Our intuitive interface ensures that you never miss a deadline or forget an important task.
        </p>

        <h3>Secure and Private</h3>
        <p>
          Your data privacy is our top priority. With myNotebook, each user’s data is stored separately and securely. We use advanced encryption methods to ensure that your notes and tasks remain confidential and protected.
        </p>

        <h3>Cross-Platform Accessibility</h3>
        <p>
          Access your notes and to-do lists from anywhere, at any time. myNotebook is available on multiple devices, ensuring that you can stay organized whether you’re at home, in the office, or on the go.
        </p>

        <h3>Easy Account Management</h3>
        <p>
          Creating an account with myNotebook is quick and easy. Once you’re signed up, you can start taking notes and creating to-do lists immediately. Your data is automatically synced across all your devices, so you always have the latest information at your fingertips.
        </p>
      </div>

      <hr />

      <div className="choose-us">
        <h2>Why Choose myNotebook?</h2>
        <p>
          <strong>User-Friendly Interface:</strong> Our platform is designed with simplicity in mind, making it easy for you to get started and stay organized.
        </p>
        <p>
          <strong>Reliable Performance:</strong> myNotebook is built to handle your data efficiently, ensuring a smooth and reliable experience.
        </p>
        <p>
          <strong>Community and Support:</strong> We’re here to support you every step of the way. Our community and customer support team are always ready to assist you with any questions or issues you may have.
        </p>
      </div>

      <p className="footer-note">
        Thank you for choosing myNotebook. We’re excited to be a part of your journey to better organization and productivity. If you have any questions or feedback, please don’t hesitate to reach out to us.
      </p>

      <p className="footer-note">Happy note-taking!</p>
    </div>
  );
}

export default About;
