from website import create_app

app = create_app()
app.config['WTF_CSRF_ENABLED'] = False
app.config['UPLOAD_FOLDER'] = ''
if __name__ == "__main__":
    app.run(debug=True)