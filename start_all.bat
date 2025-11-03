@echo off
echo ========================================
echo   RFM Analytics Platform
echo   Starting Backend and Frontend
echo ========================================
echo.

echo Starting Backend Server...
start "RFM Backend" cmd /k "cd backend && call venv\Scripts\activate && python main.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "RFM Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window
echo (Backend and Frontend will keep running)
echo ========================================
pause >nul
