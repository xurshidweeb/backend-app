const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form App</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          
          .container {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 450px;
            padding: 40px;
            text-align: center;
          }
          
          h2 {
            color: #333;
            margin-bottom: 25px;
            font-size: 28px;
            font-weight: 600;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
          }
          
          input[type="text"]:focus {
            border-color: #667eea;
            outline: none;
          }
          
          input[type="text"]::placeholder {
            color: #aaa;
          }
          
          button {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 15px 30px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: 600;
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          .result {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
          
          .result p {
            margin: 0;
            color: #333;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Welcome to Our App</h2>
          <form method="POST" action="/">
            <div class="form-group">
              <input type="text" name="username" placeholder="Enter your name" required>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </body>
      </html>
    `)
  } else if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const parsed = querystring.parse(body)
      const username = parsed.username || 'unknown'

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Form Submitted</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
            }
            
            .container {
              background-color: white;
              border-radius: 12px;
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
              width: 100%;
              max-width: 450px;
              padding: 40px;
              text-align: center;
            }
            
            h2 {
              color: #4CAF50;
              margin-bottom: 25px;
              font-size: 28px;
              font-weight: 600;
            }
            
            .result {
              margin-top: 20px;
              padding: 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #4CAF50;
            }
            
            .result p {
              margin: 0;
              color: #333;
              font-size: 20px;
            }
            
            .back-btn {
              display: inline-block;
              margin-top: 25px;
              background: linear-gradient(to right, #667eea, #764ba2);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              padding: 12px 25px;
              font-size: 16px;
              transition: transform 0.3s, box-shadow 0.3s;
              font-weight: 600;
            }
            
            .back-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Form Successfully Submitted!</h2>
            <div class="result">
              <p>Username: <strong>${username}</strong></p>
            </div>
            <a href="/" class="back-btn">Go Back</a>
          </div>
        </body>
        </html>
      `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
