// Definimos a URL base do nosso backend. Em desenvolvimento, ele vai rodar na porta 3000.
// Em produção, isso pode mudar.
const API_URL = 'https://portfolio-backend-juan.onrender.com/api/projects';

// Colocando o ano atual no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Função principal que busca os projetos do backend e os exibe na tela
async function loadProjects() {
  const grid = document.getElementById('projects-grid');

  try {
    // Fazemos a requisição GET segura para o nosso backend Node.js
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar os dados');
    
    const projects = await response.json();
    
    // Limpamos o texto de "Carregando..."
    grid.innerHTML = '';

    // Se não tiver nenhum projeto, mostramos uma mensagem
    if (projects.length === 0) {
      grid.innerHTML = '<p class="placeholder-text">Nenhum projeto adicionado ainda.</p>';
      return;
    }

    // Para cada projeto retornado, construímos o HTML do cartão
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      // Montamos o HTML do cartão, injetando os dados de forma limpa
      card.innerHTML = `
        <h3 class="project-title">${project.name}</h3>
        <p class="project-desc">${project.description}</p>
        
        <div class="project-meta">
          ${project.language ? `<span><span class="language-dot"></span>${project.language}</span>` : ''}
          ${project.stars !== undefined ? `<span>⭐ ${project.stars}</span>` : ''}
        </div>
        
        <!-- Botões de ver codigo, frontend e backend, só aparece se existir -->
        <div class="project-links">
          ${project.deploy_url ? `<a href="${project.deploy_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Ver Deploy</a>` : ''}
          ${project.github_front_url ? `<a href="${project.github_front_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Frontend</a>` : ''}
          ${project.github_back_url ? `<a href="${project.github_back_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Backend</a>` : ''}
        </div>
      `;
      
      grid.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p style="color: #ef4444;">Ocorreu um erro ao carregar os projetos. Verifique se o backend está rodando.</p>';
  }
}

// Quando a página carregar, chamamos a função
document.addEventListener('DOMContentLoaded', loadProjects);
