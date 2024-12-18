
FROM  python:3.13.0-bullseye

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . . 
EXPOSE 8000
