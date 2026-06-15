// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-people",
          title: "people",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-creating-an-mri-mega-dataset",
        
          title: "Creating an MRI Mega-Dataset",
        
        description: "how we collected over 80k high-quality, publicly available image volumes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/mega-datasets/";
          
        },
      },{id: "news-3d-brain-mri-ddpm-project-release-preprint-code-and-pretrained-weights",
          title: '3D Brain MRI DDPM Project Release: preprint, code, and pretrained weights',
          description: "",
          section: "News",},{id: "news-eclare-published-in-the-journal-of-medical-imaging",
          title: 'ECLARE published in the Journal of Medical Imaging',
          description: "",
          section: "News",},{id: "news-new-project-page-single-image-super-resolution-for-clinical-mri",
          title: 'New Project Page: Single-Image Super-Resolution for Clinical MRI',
          description: "",
          section: "News",},{id: "projects-ddpms-for-mri",
          title: 'DDPMs for MRI',
          description: "Diffusion-Driven Generation of Minimally Preprocessed Brain MRI",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ddpm-3dmri/";
            },},{id: "projects-physics-based-single-image-super-resolution-for-mri",
          title: 'Physics-Based Single-Image Super-Resolution for MRI',
          description: "From self-supervised enhancement to generative-prior recovery",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sisr/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%62%6C%61%6B%65.%64%65%77%65%79@%6A%68%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/piksl-research", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=G_x76scAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
