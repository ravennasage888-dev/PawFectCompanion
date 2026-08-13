server {
    server_name pawfectcompanions.com www.pawfectcompanions.com;
    client_max_body_size 20M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;

    location /static/ {
        alias /var/www/pawfect/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ { proxy_pass http://res.cloudinary.com; }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/pawfectcompanions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pawfectcompanions.com/privkey.pem;
}

server {
    server_name pawfectcompanions.com www.pawfectcompanions.com;
    listen 80;
    return 301 https://$host$request_uri;
}