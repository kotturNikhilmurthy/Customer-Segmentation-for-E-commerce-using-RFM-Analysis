@echo off
echo Starting RFM Analytics Frontend...
echo.

cd frontend

if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting Vite development server...
echo Frontend will be available at http://localhost:3000
echo.
npm run dev

pause
