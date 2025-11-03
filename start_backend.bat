@echo off
echo Starting RFM Analytics Backend...
echo.

cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing/updating dependencies...
pip install -r requirements.txt
echo.

echo Starting FastAPI server...
echo Backend will be available at http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
python main.py

pause
