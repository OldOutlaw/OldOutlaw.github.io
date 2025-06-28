# Wedding Portfolio

This project is a wedding portfolio website built using Flask, a lightweight WSGI web application framework in Python. The website allows users to inquire about wedding services and provides a contact form for potential clients.

## Project Structure

```
wedding-portfolio
├── app
│   ├── __init__.py          # Initializes the Flask application
│   ├── routes.py            # Defines the application routes
│   ├── static
│   │   ├── css
│   │   │   └── styles.css    # CSS styles for the website
│   │   └── js
│   │       └── form-handler.js # JavaScript for handling the contact form
│   └── templates
│       ├── base.html        # Base HTML template
│       └── index.html       # Main landing page
├── requirements.txt          # Project dependencies
├── run.py                    # Entry point for running the application
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd wedding-portfolio
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required packages:**
   ```
   pip install -r requirements.txt
   ```

## Running the Application

To run the application, execute the following command:

```
python run.py
```

The application will start on `http://127.0.0.1:5000/`. You can access it through your web browser.

## Usage

- Navigate to the homepage to view the wedding portfolio.
- Use the contact form to inquire about services. The form includes validation to ensure all required fields are filled out correctly.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.