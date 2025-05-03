FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create a non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

COPY . .

EXPOSE 8000

# The actual command will be overridden by docker-compose
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]