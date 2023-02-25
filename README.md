## Passos para executar o aplicativo BUSSTOP

1. Clone o repositório: 
```bash
git clone git@github.com:Jansenck/BUSSTOP.git

2. Abra o repositório (pasta 'mobile') no terminal e execute o seguinte comando:

```bash
npm i

3. Execute o comando:

```bash
npx expo start

4. 
Criando uma chave da API do Google:

• Criando uma chave da API do Google.
• Acesse o Console de APIs do Google em https://console.developers.google.com/.

• Clique em "Criar projeto" no canto superior direito.

• Dê um nome ao projeto e clique em "Criar".

• Depois que o projeto for criado, selecione-o no menu suspenso no canto superior esquerdo da tela.

• Clique em "Ativar APIs e serviços".

• Na página "Biblioteca", pesquise a API para a qual deseja criar uma chave. Por exemplo, para criar uma chave da API do Google Maps, pesquise "Maps JavaScript API".

• Clique na API desejada e, em seguida, clique no botão "Ativar".

• Depois que a API estiver ativada, clique no link "Criar credenciais".

• Selecione "Chave da API" na lista de opções.

• Em seguida, selecione o tipo de chave da API que deseja criar. As opções são "Restrita", "Não restrita" ou "do Servidor".

• Selecione a(s) plataforma(s) para a(s) qual(is) deseja que a chave seja válida (por exemplo, web, iOS ou Android).

• Insira o nome do pacote do aplicativo, caso esteja criando uma chave para um aplicativo móvel.

• Insira as informações de referenciador, se estiver criando uma chave restrita.

• Clique em "Criar" e a chave da API será gerada.

• Copie a chave da API gerada e para usar no App:
• Crie um arquivo .env na raiz do projeto 
• Crie a variável de ambiente MAPS_API_KEY=CHAVE_DO_GOOGLE_API

5- Certifique-se que a sua localização está ativa

6- Baixe o App 'Expo Go' e conect o App através do QR do terminal

7- Ao entrar no app visualize os pontos de onibus próximos a você

8- Desative - Ative a visualização dos pontos de onibus no botão azul no canto inferior da tela
