document.addEventListener('DOMContentLoaded', function() {
    // Datos de las herramientas de versionamiento
    const versioningTools = [
        {
            id: 1,
            name: "Git",
            type: "distributed",
            logo: "git-icon.png",
            description: "Sistema de control de versiones distribuido más popular, creado por Linus Torvalds.",
            features: [
                "Descentralizado",
                "Ramas livianas",
                "Alto rendimiento",
                "Staging area"
            ],
            releaseYear: 2005,
            popularity: 95,
            website: "https://git-scm.com",
            stars: 5
        },
        {
            id: 2,
            name: "Subversion (SVN)",
            type: "centralized",
            logo: "svn-icon.png",
            description: "Sistema de control de versiones centralizado, sigue siendo popular en entornos empresariales.",
            features: [
                "Centralizado",
                "Control de acceso fino",
                "Mejor manejo de binarios",
                "Commits atómicos"
            ],
            releaseYear: 2000,
            popularity: 65,
            website: "https://subversion.apache.org",
            stars: 4
        },
        {
            id: 3,
            name: "Mercurial",
            type: "distributed",
            logo: "mercurial-icon.png",
            description: "Sistema distribuido similar a Git pero con un enfoque en simplicidad y facilidad de uso.",
            features: [
                "Interfaz más simple",
                "Alto rendimiento",
                "Soporte para grandes repositorios",
                "Extensible"
            ],
            releaseYear: 2005,
            popularity: 30,
            website: "https://www.mercurial-scm.org",
            stars: 3
        },
        {
            id: 4,
            name: "GitHub",
            type: "cloud",
            logo: "github-icon.png",
            description: "Plataforma de hosting para repositorios Git con herramientas de colaboración.",
            features: [
                "Pull requests",
                "GitHub Actions",
                "GitHub Pages",
                "Proyectos y Wiki"
            ],
            releaseYear: 2008,
            popularity: 90,
            website: "https://github.com",
            stars: 5
        },
        {
            id: 5,
            name: "GitLab",
            type: "cloud",
            logo: "gitlab-icon.png",
            description: "Plataforma completa DevOps con Git como sistema de versionamiento subyacente.",
            features: [
                "CI/CD integrado",
                "Auto DevOps",
                "Herramientas de seguridad",
                "Opción self-hosted"
            ],
            releaseYear: 2011,
            popularity: 80,
            website: "https://gitlab.com",
            stars: 5
        },
        {
            id: 6,
            name: "Bitbucket",
            type: "cloud",
            logo: "bitbucket-icon.png",
            description: "Solución de Atlassian para hosting de repositorios Git y Mercurial.",
            features: [
                "Integración con Jira",
                "Pipelines para CI/CD",
                "Soporte para Mercurial",
                "Soporte para equipos pequeños"
            ],
            releaseYear: 2008,
            popularity: 70,
            website: "https://bitbucket.org",
            stars: 4
        }
    ];

    // Elementos del DOM
    const toolsContainer = document.getElementById('tools-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const workflowTabs = document.querySelectorAll('.workflow-tab');
    const themeToggle = document.getElementById('theme-toggle');

    // Cargar herramientas iniciales
    renderTools(versioningTools);

    // Filtrado por tipo
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            let filteredTools = versioningTools;

            if (filter !== 'all') {
                filteredTools = versioningTools.filter(tool => tool.type === filter);
            }

            renderTools(filteredTools);
        });
    });

    // Ordenación
    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        let sortedTools = [...versioningTools];

        switch(sortBy) {
            case 'name':
                sortedTools.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'year':
                sortedTools.sort((a, b) => b.releaseYear - a.releaseYear);
                break;
            case 'popularity':
            default:
                sortedTools.sort((a, b) => b.popularity - a.popularity);
        }

        renderTools(sortedTools);
    });

    // Búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTools = versioningTools.filter(tool =>
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm)
        );

        renderTools(filteredTools);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Pestañas de flujo de trabajo
    workflowTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            workflowTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const workflow = tab.dataset.workflow;
            document.querySelectorAll('.workflow-diagram').forEach(diagram => {
                diagram.classList.remove('active');
            });

            document.getElementById(`${workflow}-flow`).classList.add('active');
        });
    });

    // Cambiar tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeButton(newTheme);
    });

    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    }

    // Renderizar gráfico comparativo
    renderComparisonChart();

    // Actualizar año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Función para renderizar herramientas
    function renderTools(tools) {
        toolsContainer.innerHTML = '';

        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card animate__animated animate__fadeIn';
            toolCard.dataset.type = tool.type;

            // Calcular antigüedad
            const age = new Date().getFullYear() - tool.releaseYear;

            toolCard.innerHTML = `
                <span class="tool-badge">${tool.type === 'distributed' ? 'Distribuido' :
                tool.type === 'centralized' ? 'Centralizado' :
                    'En la Nube'}</span>
                <div class="tool-header">
                    <div class="tool-icon">
                        <img src="assets/icons/${tool.logo}" alt="${tool.name} logo">
                    </div>
                    <div>
                        <h3 class="tool-title">${tool.name}</h3>
                        <p class="tool-subtitle">Lanzado en ${tool.releaseYear} (${age} años)</p>
                    </div>
                </div>
                <div class="tool-body">
                    <p class="tool-description">${tool.description}</p>
                    
                    <div class="tool-meta">
                        <div class="tool-meta-item">
                            <div class="meta-value">${tool.popularity}%</div>
                            <div class="meta-label">Popularidad</div>
                        </div>
                        <div class="tool-meta-item">
                            <div class="meta-value">${tool.stars}/5</div>
                            <div class="meta-label">Valoración</div>
                        </div>
                        <div class="tool-meta-item">
                            <div class="meta-value">${tool.features.length}</div>
                            <div class="meta-label">Características</div>
                        </div>
                    </div>
                    
                    <div class="tool-features">
                        <h4>Principales características:</h4>
                        <ul>
                            ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="tool-footer">
                    <a href="${tool.website}" target="_blank" class="tool-link">
                        Visitar sitio <i class="fas fa-external-link-alt"></i>
                    </a>
                    <div class="tool-stars">
                        <i class="fas fa-star"></i> ${'★'.repeat(tool.stars)}${'☆'.repeat(5 - tool.stars)}
                    </div>
                </div>
            `;

            toolsContainer.appendChild(toolCard);
        });
    }

    // Función para renderizar gráfico comparativo
    function renderComparisonChart() {
        const ctx = document.getElementById('featuresChart').getContext('2d');
        const toolsForChart = versioningTools.slice(0, 4); // Tomamos las primeras 4 para el gráfico

        const colors = [
            'rgba(110, 72, 170, 0.7)',
            'rgba(71, 118, 230, 0.7)',
            'rgba(0, 201, 167, 0.7)',
            'rgba(255, 152, 0, 0.7)'
        ];

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Popularidad', 'Rendimiento', 'Facilidad de uso', 'Colaboración', 'Características', 'Adopción empresarial'],
                datasets: toolsForChart.map((tool, index) => ({
                    label: tool.name,
                    data: [
                        tool.popularity,
                        tool.name === 'Git' ? 95 : tool.name === 'Mercurial' ? 85 : 70,
                        tool.name === 'Mercurial' ? 90 : tool.name === 'Git' ? 75 : 65,
                        tool.type === 'cloud' ? 90 : 70,
                        tool.features.length * 15,
                        tool.name === 'Git' ? 90 : tool.name === 'Subversion (SVN)' ? 80 : 60
                    ],
                    backgroundColor: colors[index],
                    borderColor: colors[index].replace('0.7', '1'),
                    borderWidth: 2,
                    pointBackgroundColor: colors[index],
                    pointRadius: 4
                }))
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20
                        }
                    }
                }
            }
        });

        // Actualizar leyenda
        const legendList = document.getElementById('chart-legend-list');
        toolsForChart.forEach((tool, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="legend-color" style="background: ${colors[index]}"></span>
                ${tool.name}
            `;
            legendList.appendChild(li);
        });
    }

    // Animaciones adicionales
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.tool-card, .comparison-chart, .workflow-tabs').forEach(el => {
        observer.observe(el);
    });

    // Mostrar mensaje en consola
    console.log('%c🚀 Herramientas de Versionamiento', 'color: #6e48aa; font-size: 18px; font-weight: bold;');
    console.log('%cExplora las mejores herramientas para control de versiones en 2023', 'color: #4776E6;');
    console.log('%cDesarrollado con 💜 para la comunidad de desarrollo', 'color: #00c9a7;');
});