// const welcomeTemplate = (name) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//     <title>Welcome</title>
//     <style>
//       body {
//         margin: 0;
//         padding: 0;
//         background-color: #f4f6f8;
//         font-family: Arial, sans-serif;
//       }

//       .container {
//         width: 100%;
//         padding: 20px 0;
//         background-color: #f4f6f8;
//       }

//       .email-box {
//         max-width: 600px;
//         margin: auto;
//         background: #ffffff;
//         border-radius: 8px;
//         overflow: hidden;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//       }

//       .header {
//         background: #0a2540;
//         color: #ffffff;
//         padding: 24px;
//         text-align: center;
//         font-size: 20px;
//         font-weight: bold;
//       }

//       .content {
//         padding: 24px;
//         color: #333333;
//         line-height: 1.6;
//       }

//       .content h2 {
//         margin-top: 0;
//         color: #0a2540;
//       }

//       .features {
//         margin: 20px 0;
//         padding: 0;
//         list-style: none;
//       }

//       .features li {
//         margin-bottom: 12px;
//         padding-left: 16px;
//         position: relative;
//       }

//       .features li::before {
//         content: "•";
//         position: absolute;
//         left: 0;
//         color: #0a2540;
//         font-weight: bold;
//       }

//       .cta {
//         text-align: center;
//         margin: 30px 0;
//       }

//       .cta a {
//         display: inline-block;
//         padding: 12px 24px;
//         background-color: #0a2540;
//         color: #ffffff;
//         text-decoration: none;
//         border-radius: 4px;
//         font-weight: bold;
//       }

//       .footer {
//         background: #f4f6f8;
//         text-align: center;
//         padding: 16px;
//         font-size: 12px;
//         color: #888888;
//       }

//       /* Mobile responsiveness */
//       @media only screen and (max-width: 600px) {
//         .content {
//           padding: 16px;
//         }

//         .header {
//           font-size: 18px;
//           padding: 16px;
//         }
//       }
//     </style>
//   </head>

//   <body>
//     <div class="container">
//       <div class="email-box">

//         <div class="header">
//           Welcome to Our Trading Platform
//         </div>

//         <div class="content">
//           <h2>Hello ${name},</h2>

//           <p>
//             We are pleased to welcome you to our platform. You are now part of a modern trading ecosystem designed to help you make smarter and more efficient financial decisions.
//           </p>

//           <p>
//             Our platform combines advanced trading tools with intelligent automation to deliver a seamless and powerful experience.
//           </p>

//           <ul class="features">
//             <li>Advanced trading tools for real-time market execution</li>
//             <li>AI-powered trading insights and automation</li>
//             <li>Unexpected intelligent features designed to enhance decision-making</li>
//             <li>Reliable and secure infrastructure</li>
//             <li>Dedicated 24/7 support to assist you at any time</li>
//           </ul>

//           <p>
//             Whether you are an experienced trader or just getting started, our platform is built to support your growth and performance.
//           </p>

//           <div class="cta">
//             <a href="#">Get Started</a>
//           </div>

//           <p>
//             If you have any questions, our support team is always available to help.
//           </p>

//           <p>
//             Regards,<br/>
//             The Team
//           </p>
//         </div>

//         <div class="footer">
//           © ${new Date().getFullYear()} Your Company. All rights reserved.
//         </div>

//       </div>
//     </div>
//   </body>
//   </html>
//   `;
// };

// module.exports = { welcomeTemplate };