# Portfolio Robert Iver — Deploy na AWS EC2

Guia completo para publicar este projeto (Vite + Vue 3) em uma instância EC2 com Nginx.

---

## Pré-requisitos

- Conta na AWS com acesso ao Console
- Par de chaves `.pem` gerado na AWS
- [Node.js 18+](https://nodejs.org/) instalado localmente

---

## 1. Criar a Instância EC2

1. Acesse **EC2 → Launch Instance** no Console AWS.
2. Escolha a AMI: **Ubuntu Server 24.04 LTS (Free Tier eligible)**.
3. Tipo de instância: `t2.micro` (free tier) ou superior.
4. Em **Key pair**, selecione ou crie um par de chaves e baixe o `.pem`.
5. Em **Security Group**, adicione as regras de entrada:

   | Tipo  | Protocolo | Porta | Origem    |
   |-------|-----------|-------|-----------|
   | SSH   | TCP       | 22    | Meu IP    |
   | HTTP  | TCP       | 80    | 0.0.0.0/0 |
   | HTTPS | TCP       | 443   | 0.0.0.0/0 |

6. Clique em **Launch Instance**.

---

## 2. Conectar à Instância

```bash
chmod 400 sua-chave.pem
ssh -i "sua-chave.pem" ubuntu@<IP-PUBLICO-DA-INSTANCIA>
```

---

## 3. Configurar o Servidor

### Atualizar pacotes e instalar Node.js + Nginx

```bash
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Verificar versões
node -v
npm -v
nginx -v
```

---

## 4. Enviar o Projeto para o Servidor

### Opção A — Via Git (recomendado)

```bash
# No servidor
sudo apt install -y git
git clone https://github.com/seu-usuario/portfolio-robert.git
cd portfolio-robert
```

### Opção B — Via SCP (upload local)

```bash
# No seu computador local
scp -i "sua-chave.pem" -r ./portfolio-robert ubuntu@<IP>:~/portfolio-robert
```

---

## 5. Gerar o Build de Produção

```bash
cd ~/portfolio-robert
npm install
npm run build
```

O build será gerado na pasta `dist/`.

---

## 6. Configurar o Nginx

### Copiar os arquivos do build

```bash
sudo mkdir -p /var/www/portfolio
sudo cp -r ~/portfolio-robert/dist/* /var/www/portfolio/
```

### Criar o arquivo de configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Cole o conteúdo abaixo:

```nginx
server {
    listen 80;
    server_name <IP-PUBLICO-DA-INSTANCIA>;  # ou seu domínio

    root /var/www/portfolio;
    index index.html;

    # Necessário para Vue Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compressão gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
}
```

### Ativar o site e reiniciar o Nginx

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t          # testa a configuração
sudo systemctl restart nginx
sudo systemctl enable nginx
```

Acesse `http://<IP-PUBLICO>` no navegador — o portfólio deve estar no ar.

---

## 7. (Opcional) Domínio + HTTPS com Let's Encrypt

### Apontar o domínio

No painel do seu registrador de domínio, crie um registro **A** apontando para o IP público da instância.

### Instalar o Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

O Certbot configura o HTTPS automaticamente e renova o certificado a cada 90 dias.

---

## 8. Atualizar o Deploy Após Alterações

```bash
# No servidor
cd ~/portfolio-robert
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/portfolio/
sudo systemctl reload nginx
```

---

## Estrutura Resumida do Fluxo

```
Código local → git push → EC2 (git pull) → npm run build → /var/www/portfolio → Nginx → Internet
```

---

## Variáveis Úteis

| Variável         | Descrição                          |
|------------------|------------------------------------|
| `<IP>`           | IP público da instância EC2        |
| `sua-chave.pem`  | Arquivo de chave privada baixado   |
| `seudominio.com` | Domínio apontando para o IP da EC2 |
