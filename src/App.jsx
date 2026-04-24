import React, { useState, useEffect } from 'react';
import {
  Globe, User, GraduationCap, Briefcase,
  Compass, Mail, Calendar,
  Award, Code, Database, Server, ChevronRight,
  ImagePlus, Trash2, X, ZoomIn, Edit3, Save, LayoutGrid, FileJson, Settings2
} from 'lucide-react';

// === 自定义 Github 图标 ===
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.94-.68 1.98-.8 3.5-.5.2-1.2.3-2 .3-1.2 0-2-.9-2-2 0 0-.5-1-1-1s-1 0-1 0c-.2.1-.2.2 0 .3.5.3 1 1 1 1s1 2 2 2c1 0 2 0 2-.1v2.9"></path>
  </svg>
);

// === 初始多语言数据字典 ===
const initialDict = {
  zh: {
    nav: { about: "关于我", edu: "教育与技能", exp: "实习经历", life: "领导力与生活" },
    hero: {
      name: "你好，我是 [你的名字]",
      title: "数据科学与大数据技术 | 全栈工程师",
      desc: "具备扎实的大数据处理与全栈开发能力。不仅能在屏幕前搭建高鲁棒性的多模识别系统，也能深入热带雨林构建植物数据溯源平台。热衷于将数据分析方法应用于跨界领域，拥有强烈的团队协作精神与创新实践能力。",
      vision: "个人愿景：建设一个富足非凡的世界",
      thanks: "非常感谢您在百忙之中查阅我的主页，期待能与您进一步交流。",
      contact: "联系我",
      github: "我的 GitHub"
    },
    edu: {
      title: "教育背景",
      school1: "美国东北州立大学 | 广州工商学院",
      degree1: "数据科学与大数据技术 (本科)",
      date1: "2022.09 - 2026.06",
      gpa1: "GPA: 3.65",
      awards1: "全国大创二等奖(负责人) | 互联网+铜奖(负责人) | 华为 HarmonyOS 高级开发者认证",
      school2: "华为鲲鹏大数据微专业",
      degree2: "线下专项培养",
      date2: "2023.09 - 2025.06",
      gpa2: "GPA: 3.65",
      awards2: "华为大数据初级/高级工程师认证 | 大数据可视化 (90) | Python程序设计 (86)",
      gradProjTitle: "核心毕业设计",
      gradProjName: "基于 RMT 的随机矩阵可视化分析系统 (Vue3 + FastAPI)",
      gradProjDesc: "解决多源高维数据“维度灾难”的交互式降噪与可视分析平台。",
      gradProjPoints: [
        "构建自适应 Z-score 预处理通道，消除数据集方差冲突，确保特征严格遵循 Marchenko-Pastur 定理分布。",
        "设计轻量级神经符号解耦架构：剥离纯数学计算与语言模型，将核心计算转化为强约束 JSON 供 LLM 解析，彻底解决大模型在严谨计算中的幻觉问题。",
        "基于纳斯达克与标普500五年真实数据实证：滑动窗口精准捕捉宏观结构变化。将去噪矩阵代入马科维茨全局最小方差（GMV）模型回测，使投资组合最大回撤降至 5.47%。"
      ],
      gradProjImages: []
    },
    skills: {
      title: "核心技能",
      lang: "编程语言",
      data: "数据分析与挖掘",
      sys: "系统与工具",
      spoken: "语言能力",
      spokenDesc: "中文 (母语) | 英语 (四级/Duolingo 95) | 法语 (日常问候)"
    },
    exp: {
      title: "深入的实习与工作经历",
      items: [
        {
          company: "四川拜伦科技有限公司",
          role: "监控多模识别项目 全栈工程师",
          date: "2026.01 - 2026.04",
          desc: "在此项目中，我主导了核心的识别系统架构设计与后端开发。",
          points: [
            "负责用于监控摄像头语音识别以及情绪识别项目的设计与开发。",
            "使用 Python 进行后端搭建，引入 Whisper 语音识别以及 Cam++ 声纹识别技术。",
            "创新性引入在线+离线双轨识别以及自适应环境算法，实现了复杂噪音环境下高鲁棒性的实时多模识别。",
            "优化 API 响应时间，提升了系统整体吞吐量。"
          ],
          images: []
        },
        {
          company: "中国科学院昆明植物研究所",
          role: "野外调查与数据系统工程师",
          date: "2025.08 - 2025.09",
          desc: "跨界将计算机科学应用于自然科学，体验从泥土到云端的完整数据生命周期。",
          points: [
            "深入普洱与西双版纳热带雨林，参与森林植物样地调查，负责样地设计、标准化采样与严谨的数据记录。",
            "发现传统数据记录的痛点，独立使用 Python 开发信息管理系统。",
            "实现野外调查数据的实时录入、结构化查询与全链路溯源，大幅提升了科研数据的一致性与完整性。"
          ],
          images: []
        },
        {
          company: "成都大数据产业技术研究院",
          role: "前端与数据工程实习生",
          date: "2024.07 - 2024.08",
          desc: "参与企业级大数据平台的建设，积累了丰富的工程化经验。",
          points: [
            "参与水环境监测数据平台建设，协助数据接入模块与前端界面组件开发。",
            "协助数据库配置，基于 openEuler 虚拟机环境处理大规模水文数据集，熟悉了 Linux 生产环境的运维与调优。"
          ],
          images: []
        },
        {
          company: "广州光华教育科技 (网易)",
          role: "数据分析实习生",
          date: "2024.06",
          desc: "以数据驱动教育产品迭代，将分析结果转化为实际的业务增长点。",
          points: [
            "分析海量学生学习行为数据，运用 SQL 与 Python 产出周度分析报告。",
            "为课程研发提供核心决策支持，与研发团队协作设计并评估个性化学习路径推荐方案。"
          ],
          images: []
        },
        {
          company: "广州达内教育",
          role: "教学实习生 (Java / 游戏开发)",
          date: "2023.06 - 2023.07",
          desc: "将技术知识转化为通俗易懂的教学内容，锻炼了出色的沟通与逻辑表达能力。",
          points: [
            "协助开展 Java 游戏开发课程教学，提供 1:1 调试与答疑支持。",
            "制作教学演示与课程资料，并与学生及家长沟通学习进度。"
          ],
          images: []
        }
      ]
    },
    life: {
      title: "领导力与生活探索",
      football: {
        title: "学院足球队队长兼主教练",
        desc: "不仅是绿茵场上的精神领袖，更是用数据武装头脑的战术制定者。",
        points: [
          "统筹管理球队日常运营、招新与赛事安排。",
          "创新性地将数据分析方法应用于训练中：通过记录并量化球员跑动距离、传球成功率、对抗胜率等指标，构建球员能力雷达图。",
          "基于数据反馈，针对性优化比赛阵型与战术排布，带领球队在校级联赛中取得突破性成绩。"
        ],
        images: []
      },
      innovation: {
        title: "创新创业与科研探索",
        desc: "热衷于将技术创意转化为具备社会价值的实际项目。",
        points: [
          "作为项目负责人，带领跨专业团队荣获全国大学生创新创业大赛省级二等奖。",
          "连续两年（2023、2024）获得中国国际“互联网+”大学生创新创业大赛省级铜奖。",
          "在项目中主要负责核心算法构建与商业模式的数据论证，具备极强的项目全周期管理与抗压能力。"
        ],
        images: []
      }
    }
  },
  en: {
    nav: { about: "About", edu: "Education", exp: "Experience", life: "Leadership & Life" },
    hero: {
      name: "Hi, I'm [Your Name]",
      title: "Data Science & Big Data | Full Stack Engineer",
      desc: "Equipped with solid capabilities in Big Data processing and full-stack development. Capable of building highly robust multi-modal recognition systems, as well as diving into tropical rainforests to build plant data traceability platforms. Passionate about applying data analysis to interdisciplinary fields, with strong teamwork and innovation skills.",
      vision: "Vision: To build an extraordinarily abundant world.",
      thanks: "Thank you very much for taking the time to review my profile. I look forward to communicating with you further.",
      contact: "Contact Me",
      github: "My GitHub"
    },
    edu: {
      title: "Education",
      school1: "Northeastern State University (US) | Guangzhou College of Technology and Business",
      degree1: "B.S. in Data Science and Big Data Technology",
      date1: "Sep 2022 - Jun 2026",
      gpa1: "GPA: 3.65",
      awards1: "National Innovation Competition 2nd Prize | Internet+ Bronze | Huawei HarmonyOS Advanced Dev",
      school2: "Huawei Kunpeng Big Data Micro-Major",
      degree2: "Offline Special Training",
      date2: "Sep 2023 - Jun 2025",
      gpa2: "GPA: 3.65",
      awards2: "Huawei Big Data Certifications | Big Data Visualization (90) | Python Programming (86)",
      gradProjTitle: "Graduation Project",
      gradProjName: "RMT-based Random Matrix Visualization System (Vue3 + FastAPI)",
      gradProjDesc: "An interactive denoising and visual analysis platform designed to solve the 'curse of dimensionality' in multi-source high-dimensional data.",
      gradProjPoints: [
        "Built an adaptive Z-score preprocessing pipeline to eliminate variance conflicts, ensuring features strictly follow the Marchenko-Pastur distribution.",
        "Designed a neuro-symbolic decoupling architecture: separated the pure math engine from the LLM, feeding strict JSON results to completely eliminate hallucinations in rigorous mathematical tasks.",
        "Backtested with 5-year Nasdaq and S&P 500 data: applied the denoised matrix to the Markowitz GMV model, reducing the portfolio's maximum drawdown to 5.47%."
      ],
      gradProjImages: []
    },
    skills: {
      title: "Core Skills",
      lang: "Programming",
      data: "Data & Analytics",
      sys: "Systems & Tools",
      spoken: "Languages",
      spokenDesc: "Chinese (Native) | English (CET-4 / Duolingo 95) | French (Basic)"
    },
    exp: {
      title: "Professional Experience",
      items: [
        {
          company: "Sichuan Bailun Technology", role: "Full Stack Engineer (Multi-modal)", date: "Jan 2026 - Apr 2026", desc: "Led the core architecture design and backend development for the recognition system.",
          points: ["Designed and developed a voice and emotion recognition project for surveillance cameras.", "Built the backend using Python, integrating Whisper for speech recognition and Cam++ for voiceprint recognition.", "Innovated an online+offline dual-track recognition system with adaptive environment algorithms, achieving highly robust real-time multi-modal recognition.", "Optimized API response time, significantly improving overall system throughput."], images: []
        },
        {
          company: "Kunming Institute of Botany, CAS", role: "Field Survey & Data System Engineer", date: "Aug 2025 - Sep 2025", desc: "Applied computer science to natural sciences, experiencing the full data lifecycle from soil to cloud.",
          points: ["Conducted forest plant plot surveys in tropical rainforests (Pu'er & Xishuangbanna), handling rigorous sampling and data recording.", "Developed an information management system using Python independently to solve traditional recording pain points.", "Enabled real-time data entry, structured querying, and full-link traceability, significantly improving data integrity."], images: []
        },
        {
          company: "Chengdu Big Data Industry Tech", role: "Data Engineering Intern", date: "Jul 2024 - Aug 2024", desc: "Participated in enterprise-level big data platform construction, accumulating rich engineering experience.",
          points: ["Assisted in developing data integration modules and frontend UI components for a water environment monitoring platform.", "Configured databases and processed large-scale hydrological datasets using openEuler VMs, mastering Linux production environments."], images: []
        },
        {
          company: "Guangzhou Guanghua Education Tech", role: "Data Analyst Intern", date: "Jun 2024", desc: "Drove educational product iteration with data, translating analysis results into actual business growth.",
          points: ["Analyzed massive student learning behavior data using SQL and Python to produce weekly analysis reports.", "Provided core decision support for course R&D, collaborating to design personalized learning paths."], images: []
        },
        {
          company: "Guangzhou Tarena Education", role: "Teaching Intern", date: "Jun 2023 - Jul 2023", desc: "Translated technical knowledge into easy-to-understand teaching materials, demonstrating excellent communication skills.",
          points: ["Assisted in teaching Java game development courses, providing 1:1 debugging and Q&A support.", "Created teaching demos and course materials, actively communicating learning progress with students and parents."], images: []
        }
      ]
    },
    life: {
      title: "Leadership & Life Exploration",
      football: { title: "Captain & Head Coach, College Football Team", desc: "Not only a spiritual leader on the pitch, but also a tactician armed with data.", points: ["Coordinated daily team operations, recruitment, and match schedules.", "Innovatively applied data analysis to training: quantified running distance and pass success rate to build player radar charts.", "Optimized formations based on data feedback, leading the team to breakthrough results in the college league."], images: [] },
      innovation: { title: "Innovation & Research", desc: "Passionate about turning tech ideas into practical projects with social value.", points: ["Led a cross-disciplinary team to win the Provincial 2nd Prize in the National Student Innovation Competition.", "Won the Provincial Bronze in the China International 'Internet+' Competition for two consecutive years (2023, 2024).", "Responsible for core algorithm construction and business model data validation, demonstrating strong stress-resistance and project management abilities."], images: [] }
    }
  },
  fr: {
    nav: { about: "À Propos", edu: "Éducation", exp: "Expériences", life: "Leadership & Vie" },
    hero: {
      name: "Bonjour, je suis [Votre Nom]",
      title: "Science des Données & Big Data | Ingénieur Full Stack",
      desc: "Doté de solides capacités en traitement Big Data et développement full-stack. Capable de construire des systèmes de reconnaissance multimodaux très robustes, ainsi que de plonger dans les forêts tropicales pour créer des plateformes de traçabilité des plantes. Passionné par l'application de l'analyse de données aux domaines interdisciplinaires.",
      vision: "Vision : Construire un monde extraordinairement abondant.",
      thanks: "Merci beaucoup d'avoir pris le temps de consulter mon profil. J'ai hâte de pouvoir échanger avec vous.",
      contact: "Contactez-moi",
      github: "Mon GitHub"
    },
    edu: {
      title: "Éducation",
      school1: "Northeastern State University (US) | GCTB",
      degree1: "Licence en Science des Données et Big Data",
      date1: "Sep 2022 - Juin 2026",
      gpa1: "GPA: 3.65",
      awards1: "2e Prix Concours National d'Innovation | Internet+ Bronze | Développeur Huawei HarmonyOS",
      school2: "Micro-spécialisation Huawei Kunpeng",
      degree2: "Formation Spécialisée",
      date2: "Sep 2023 - Juin 2025",
      gpa2: "GPA: 3.65",
      awards2: "Certifications Huawei Big Data | Visualisation (90) | Programmation Python (86)",
      gradProjTitle: "Projet de Fin d'Études",
      gradProjName: "Système de Visualisation de Matrices Aléatoires basé sur RMT (Vue3 + FastAPI)",
      gradProjDesc: "Une plateforme interactive de débruitage et d'analyse visuelle conçue pour résoudre le 'fléau de la dimension'.",
      gradProjPoints: [
        "Création d'un pipeline de prétraitement Z-score adaptatif pour éliminer les conflits de variance (distribution de Marchenko-Pastur).",
        "Conception d'une architecture neuro-symbolique découplée : séparation du moteur mathématique et du LLM pour éliminer les hallucinations dans les calculs rigoureux.",
        "Backtest sur 5 ans (Nasdaq et S&P 500) : application de la matrice débruitée au modèle GMV de Markowitz, réduisant le drawdown maximum du portefeuille à 5,47 %."
      ],
      gradProjImages: []
    },
    skills: {
      title: "Compétences",
      lang: "Programmation",
      data: "Analyse de Données",
      sys: "Systèmes et Outils",
      spoken: "Langues",
      spokenDesc: "Chinois (Maternel) | Anglais (Courant/Duolingo 95) | Français (Notions)"
    },
    exp: {
      title: "Expériences Professionnelles",
      items: [
        { company: "Sichuan Bailun Technology", role: "Ingénieur Full Stack (Multimodal)", date: "Janv 2026 - Avr 2026", desc: "Direction de l'architecture centrale et du développement backend pour le système de reconnaissance.", points: ["Conception et développement d'un projet de reconnaissance vocale et des émotions pour caméras de surveillance.", "Développement backend en Python, intégration de Whisper (reconnaissance vocale) et Cam++ (empreinte vocale).", "Innovation avec un système double voie (en ligne + hors ligne) très robuste face aux environnements bruyants.", "Optimisation du temps de réponse de l'API."], images: [] },
        { company: "Institut de Botanique de Kunming, CAS", role: "Ingénieur Terrain & Systèmes de Données", date: "Août 2025 - Sep 2025", desc: "Application de l'informatique aux sciences naturelles, de la terre jusqu'au cloud.", points: ["Enquêtes sur les parcelles de plantes dans la forêt tropicale (Pu'er & Xishuangbanna), échantillonnage et enregistrement rigoureux.", "Développement d'un système de gestion de l'information avec Python pour remplacer les méthodes traditionnelles.", "Saisie en temps réel, requêtes structurées et traçabilité complète des données, améliorant considérablement leur intégrité."], images: [] },
        { company: "Chengdu Big Data Industry Tech", role: "Stagiaire Ingénierie des Données", date: "Juil 2024 - Août 2024", desc: "Participation à la construction d'une plateforme Big Data d'entreprise.", points: ["Aide au développement de modules d'intégration de données et de composants UI pour la surveillance de l'environnement de l'eau.", "Configuration de bases de données et traitement de grands ensembles de données hydrologiques via openEuler VMs."], images: [] },
        { company: "Guangzhou Guanghua Edu (NetEase)", role: "Stagiaire Analyste de Données", date: "Juin 2024", desc: "Itération de produits éducatifs basée sur les données.", points: ["Analyse de données massives sur le comportement d'apprentissage des étudiants avec SQL et Python.", "Soutien décisionnel pour la R&D des cours et conception de parcours d'apprentissage personnalisés."], images: [] },
        { company: "Guangzhou Tarena Education", role: "Stagiaire Pédagogique", date: "Juin 2023 - Juil 2023", desc: "Traduction des connaissances techniques en matériel pédagogique accessible.", points: ["Assistance à l'enseignement de cours de développement de jeux Java, support de débogage 1:1.", "Création de démonstrations pédagogiques et communication des progrès avec les étudiants et les parents."], images: [] }
      ]
    },
    life: {
      title: "Leadership et Vie",
      football: { title: "Capitaine & Entraîneur, Équipe de Football", desc: "Un leader spirituel sur le terrain et un stratège armé de données.", points: ["Gestion des opérations quotidiennes, du recrutement et des matchs.", "Application de l'analyse de données à l'entraînement : quantification des distances courues et taux de réussite des passes pour construire des graphiques radar.", "Optimisation des formations basée sur les données, menant l'équipe à des résultats révolutionnaires."], images: [] },
      innovation: { title: "Innovation et Recherche", desc: "Passionné par la transformation d'idées technologiques en projets à valeur sociale.", points: ["Direction d'une équipe interdisciplinaire pour remporter le 2e Prix Provincial au Concours National d'Innovation.", "Médaille de Bronze Provinciale au concours China International 'Internet+' pendant deux années consécutives (2023, 2024).", "Responsable de la construction de l'algorithme de base et de la validation des données du modèle économique."], images: [] }
    }
  }
};

// 全局默认画廊排版配置
const defaultLayout = { cols: 3, aspect: 'video', fit: 'cover' };

// === 通用可编辑文本组件 ===
const Editable = ({ isEditMode, text, onChange, tag: Tag = 'span', className = "" }) => {
  return (
    <Tag
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={(e) => {
        if (e.target.innerText !== text) {
          onChange(e.target.innerText);
        }
      }}
      className={`${className} ${isEditMode ? 'outline-dashed outline-2 outline-blue-400 bg-blue-50/50 focus:outline-none focus:bg-white cursor-text transition-all min-w-[20px] rounded inline-block px-1 -ml-1' : ''}`}
    >
      {text}
    </Tag>
  )
}

// === 轻量级图片放大镜 (Lightbox) ===
const Lightbox = ({ src, onClose }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleWheel = (e) => {
    const delta = e.deltaY < 0 ? 1 : -1;
    setScale(prev => Math.min(Math.max(0.5, prev + delta * 0.1 * prev), 5));
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.target.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => { if (isDragging) setPos({ x: e.clientX - startPos.x, y: e.clientY - startPos.y }); };
  const handlePointerUp = (e) => { setIsDragging(false); e.target.releasePointerCapture(e.pointerId); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm" onWheel={handleWheel}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition shadow-lg"><X size={24} /></button>
      <div className="absolute bottom-8 bg-black/50 px-6 py-2 rounded-full text-white/80 text-sm flex gap-6 tracking-wide pointer-events-none z-[110]">
        <span>🖱️ 滚轮: 缩放</span><span>🖐️ 拖拽: 移动</span><span>🖱️🖱️ 双击: 复原</span>
      </div>
      <img src={src} alt="Zoomed" className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing relative z-[105]"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onDoubleClick={() => { setScale(1); setPos({ x: 0, y: 0 }) }} draggable={false}
      />
    </div>
  );
};

// === 动态图片画廊组件 (带高级排版控制器) ===
const DynamicGallery = ({ initialImages, onImageClick, isEditMode, layoutConfig = defaultLayout, onLayoutChange, onImagesChange }) => {
  const [images, setImages] = useState(initialImages || []);

  // 当外部数据改变时同步内部状态
  useEffect(() => { setImages(initialImages || []) }, [initialImages]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    const newImages = [...images, ...newImageUrls];
    setImages(newImages);
    if (onImagesChange) onImagesChange(newImages);
  };

  const handleRemoveImage = (indexToRemove) => {
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(newImages);
    if (onImagesChange) onImagesChange(newImages);
  };

  const updateConfig = (newProps) => {
    if (onLayoutChange) onLayoutChange({ ...layoutConfig, ...newProps });
  };

  // 根据配置生成 Tailwind 类名
  const colsClass = layoutConfig.cols === 1 ? 'grid-cols-1' : layoutConfig.cols === 2 ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  const aspectClass = layoutConfig.aspect === 'video' ? 'aspect-video' : layoutConfig.aspect === 'square' ? 'aspect-square' : 'aspect-auto h-64';
  const fitClass = layoutConfig.fit === 'cover' ? 'object-cover' : 'object-contain bg-white';

  return (
    <div className="mt-8 pt-8 border-t border-slate-100">

      {/* 编辑模式下的画廊排版控制器 */}
      {isEditMode && (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-800 text-white rounded-xl shadow-lg items-center text-sm animate-fade-in">
          <span className="font-bold flex items-center gap-2 text-blue-300"><Settings2 size={18} /> 图片排版控制:</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">列数:</span>
            <div className="flex bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
              {[1, 2, 3].map(c => (
                <button key={c} onClick={() => updateConfig({ cols: c })} className={`px-3 py-1.5 transition ${layoutConfig.cols === c ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">比例:</span>
            <div className="flex bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
              <button onClick={() => updateConfig({ aspect: 'video' })} className={`px-3 py-1.5 transition ${layoutConfig.aspect === 'video' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>16:9 宽屏</button>
              <button onClick={() => updateConfig({ aspect: 'square' })} className={`px-3 py-1.5 transition ${layoutConfig.aspect === 'square' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>1:1 方形</button>
              <button onClick={() => updateConfig({ aspect: 'auto' })} className={`px-3 py-1.5 transition ${layoutConfig.aspect === 'auto' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>固定高度</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">缩放:</span>
            <div className="flex bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
              <button onClick={() => updateConfig({ fit: 'cover' })} className={`px-3 py-1.5 transition ${layoutConfig.fit === 'cover' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>填满截取</button>
              <button onClick={() => updateConfig({ fit: 'contain' })} className={`px-3 py-1.5 transition ${layoutConfig.fit === 'contain' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-600'}`}>完整包含</button>
            </div>
          </div>
        </div>
      )}

      {/* 画廊网格 */}
      <div className={`grid ${colsClass} gap-4 transition-all duration-500`}>
        {images.map((img, i) => {
          if (!img) return null;
          const isPlaceholder = typeof img === 'string' && img.startsWith('[Image of');
          const imgSrc = isPlaceholder ? `https://via.placeholder.com/600x400?text=${encodeURIComponent(img)}` : img;

          return (
            <div key={i} className={`${aspectClass} bg-slate-100 rounded-xl overflow-hidden group relative shadow-sm border border-slate-200 cursor-pointer`} onClick={() => onImageClick(imgSrc)}>
              <img src={imgSrc} alt="Gallery Item" className={`w-full h-full ${fitClass} group-hover:scale-105 transition-transform duration-500`} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                {isPlaceholder && <span className="text-white text-sm font-medium px-4 text-center pointer-events-none">{img}</span>}
                <button onClick={(e) => { e.stopPropagation(); onImageClick(imgSrc); }} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow" title="放大查看"><ZoomIn size={16} /></button>
                {isEditMode && (
                  <button onClick={(e) => { e.stopPropagation(); handleRemoveImage(i); }} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow" title="移除图片"><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          );
        })}

        {isEditMode && (
          <label className={`${aspectClass} border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl flex flex-col items-center justify-center text-blue-500 hover:text-blue-700 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all`}>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            <ImagePlus size={32} className="mb-3 opacity-80" />
            <span className="text-sm font-bold">插入新图片</span>
            <span className="text-xs text-blue-400 mt-1">支持多选</span>
          </label>
        )}
      </div>
    </div>
  );
};


// === 主应用组件 ===
export default function App() {
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [profileImg, setProfileImg] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80");

  // === 核心状态：编辑模式与数据管理 ===
  const [isEditMode, setIsEditMode] = useState(false);
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('myResumeData');
    return saved ? JSON.parse(saved) : initialDict;
  });
  const [galleryConfigs, setGalleryConfigs] = useState(() => {
    const saved = localStorage.getItem('myGalleryConfigs');
    return saved ? JSON.parse(saved) : {};
  });
  const [showExportModal, setShowExportModal] = useState(false);

  const t = resumeData[lang];

  // 数据发生改变时自动保存到本地缓存
  useEffect(() => {
    localStorage.setItem('myResumeData', JSON.stringify(resumeData));
    localStorage.setItem('myGalleryConfigs', JSON.stringify(galleryConfigs));
  }, [resumeData, galleryConfigs]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  // 通用深度更新函数 (处理复杂的嵌套 JSON)
  const updateData = (pathArr, newValue) => {
    setResumeData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current = newData[lang];
      for (let i = 0; i < pathArr.length - 1; i++) {
        current = current[pathArr[i]];
      }
      current[pathArr[pathArr.length - 1]] = newValue;
      return newData;
    });
  };

  const updateGalleryConfig = (id, newConfig) => {
    setGalleryConfigs(prev => ({ ...prev, [id]: newConfig }));
  };

  const navItems = [
    { id: 'home', icon: User, label: t.nav.about },
    { id: 'edu', icon: GraduationCap, label: t.nav.edu },
    { id: 'exp', icon: Briefcase, label: t.nav.exp },
    { id: 'life', icon: Compass, label: t.nav.life }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        
        /* === 自定义精致滚动条 === */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}} />

      {/* 顶部导航 */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="font-black text-2xl tracking-tighter text-blue-600 flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl shadow-md">R</div>
            esume.
          </div>

          <div className="hidden md:flex space-x-1 p-1 bg-slate-100 rounded-full">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === item.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                    }`}
                ><Icon size={16} /> {item.label}</button>
              )
            })}
          </div>

          <div className="flex gap-2">
            {['zh', 'en', 'fr'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${lang === l ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
                  }`}
              >{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16 pb-40 md:pb-32">
        {/* --- 首页板块 --- */}
        {activeTab === 'home' && (
          <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in pt-12">
            <div className="relative shrink-0 group">
              <img src={profileImg} alt="Profile" className="w-56 h-56 md:w-72 md:h-72 rounded-3xl object-cover shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setLightboxImg(profileImg)} />
              {isEditMode && (
                <label className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:bg-blue-700 transition animate-fade-in" title="更换个人照片">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && setProfileImg(URL.createObjectURL(e.target.files[0]))} />
                  <ImagePlus size={24} />
                </label>
              )}
            </div>
            <div className="w-full">
              <Editable isEditMode={isEditMode} text={t.hero.name} onChange={(v) => updateData(['hero', 'name'], v)} tag="h1" className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 block w-full" />
              <div className="text-xl md:text-2xl text-blue-600 font-semibold mb-6 flex items-center gap-2">
                <Database size={24} className="shrink-0" />
                <Editable isEditMode={isEditMode} text={t.hero.title} onChange={(v) => updateData(['hero', 'title'], v)} className="w-full block" />
              </div>
              <Editable isEditMode={isEditMode} text={t.hero.desc} onChange={(v) => updateData(['hero', 'desc'], v)} tag="p" className="text-slate-600 text-lg leading-relaxed mb-6 max-w-2xl block" />

              <div className="bg-blue-50/50 border-l-4 border-blue-500 p-4 md:p-5 rounded-r-lg mb-8 max-w-2xl shadow-sm">
                <p className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                  ✨ <Editable isEditMode={isEditMode} text={t.hero.vision} onChange={(v) => updateData(['hero', 'vision'], v)} />
                </p>
                <Editable isEditMode={isEditMode} text={t.hero.thanks} onChange={(v) => updateData(['hero', 'thanks'], v)} tag="p" className="text-blue-600/90 text-sm md:text-base leading-relaxed block" />
              </div>

              {/* 联系方式与 GitHub (暂时根据要求注释隐藏) */}
              {/*
              <div className="flex flex-wrap gap-4">
                <a href="mailto:your.email@example.com" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
                  <Mail size={18} /> <Editable isEditMode={isEditMode} text={t.hero.contact} onChange={(v) => updateData(['hero', 'contact'], v)} />
                </a>
                <a href="#" className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition flex items-center gap-2">
                  <GithubIcon size={18} /> <Editable isEditMode={isEditMode} text={t.hero.github} onChange={(v) => updateData(['hero', 'github'], v)} />
                </a>
              </div>
              */}

            </div>
          </div>
        )}

        {/* --- 教育板块 --- */}
        {activeTab === 'edu' && (
          <div className="animate-fade-in space-y-16 pt-8">
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                <GraduationCap className="text-blue-600" size={32} /> <Editable isEditMode={isEditMode} text={t.edu.title} onChange={(v) => updateData(['edu', 'title'], v)} />
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map(num => (
                  <div key={num} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                      <Editable isEditMode={isEditMode} text={t.edu[`school${num}`]} onChange={(v) => updateData(['edu', `school${num}`], v)} tag="h3" className="text-xl font-bold text-slate-900 leading-tight block w-full" />
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap w-max">
                        <Editable isEditMode={isEditMode} text={t.edu[`gpa${num}`]} onChange={(v) => updateData(['edu', `gpa${num}`], v)} />
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-4 flex items-center gap-2"><Award size={16} className="shrink-0" /> <Editable isEditMode={isEditMode} text={t.edu[`degree${num}`]} onChange={(v) => updateData(['edu', `degree${num}`], v)} className="block w-full" /></p>
                    <p className="text-sm text-slate-500 mb-6 flex items-center gap-2"><Calendar size={16} className="shrink-0" /> <Editable isEditMode={isEditMode} text={t.edu[`date${num}`]} onChange={(v) => updateData(['edu', `date${num}`], v)} className="block w-full" /></p>
                    <Editable isEditMode={isEditMode} text={t.edu[`awards${num}`]} onChange={(v) => updateData(['edu', `awards${num}`], v)} tag="div" className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed block" />
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-3xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 w-max">
                    <Code size={14} /> <Editable isEditMode={isEditMode} text={t.edu.gradProjTitle} onChange={(v) => updateData(['edu', 'gradProjTitle'], v)} />
                  </span>
                  <Editable isEditMode={isEditMode} text={t.edu.gradProjName} onChange={(v) => updateData(['edu', 'gradProjName'], v)} tag="h3" className="text-xl font-bold text-slate-900 block w-full" />
                </div>
                <Editable isEditMode={isEditMode} text={t.edu.gradProjDesc} onChange={(v) => updateData(['edu', 'gradProjDesc'], v)} tag="p" className="text-blue-700 font-medium mb-6 md:pl-2 block" />
                <ul className="space-y-3 mb-6 md:pl-2">
                  {t.edu.gradProjPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <ChevronRight className="shrink-0 text-blue-500 mt-0.5" size={16} />
                      <Editable isEditMode={isEditMode} text={point} onChange={(v) => updateData(['edu', 'gradProjPoints', i], v)} className="leading-relaxed block w-full" />
                    </li>
                  ))}
                </ul>
                <DynamicGallery
                  isEditMode={isEditMode} initialImages={t.edu.gradProjImages} onImageClick={setLightboxImg}
                  layoutConfig={galleryConfigs['edu_proj'] || defaultLayout}
                  onLayoutChange={(c) => updateGalleryConfig('edu_proj', c)}
                  onImagesChange={(imgs) => updateData(['edu', 'gradProjImages'], imgs)}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                <Server className="text-blue-600" size={32} /> <Editable isEditMode={isEditMode} text={t.skills.title} onChange={(v) => updateData(['skills', 'title'], v)} />
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Code size={18} /> <Editable isEditMode={isEditMode} text={t.skills.lang} onChange={(v) => updateData(['skills', 'lang'], v)} /></h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Python', 'SQL', 'JavaScript', 'C / C++'].map(s => <span key={s} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">{s}</span>)}
                  </div>

                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Globe size={18} /> <Editable isEditMode={isEditMode} text={t.skills.spoken} onChange={(v) => updateData(['skills', 'spoken'], v)} /></h4>
                  <Editable isEditMode={isEditMode} text={t.skills.spokenDesc} onChange={(v) => updateData(['skills', 'spokenDesc'], v)} tag="p" className="text-slate-600 text-sm leading-relaxed bg-blue-50 p-4 rounded-xl block w-full" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Database size={18} /> <Editable isEditMode={isEditMode} text={t.skills.data} onChange={(v) => updateData(['skills', 'data'], v)} /></h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Hadoop', 'Spark', 'PowerBI', 'ECharts', 'Weka'].map(s => <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">{s}</span>)}
                  </div>

                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Server size={18} /> <Editable isEditMode={isEditMode} text={t.skills.sys} onChange={(v) => updateData(['skills', 'sys'], v)} /></h4>
                  <div className="flex flex-wrap gap-2">
                    {['Linux 虚拟机', 'OpenEuler', '网络与信息安全'].map(s => <span key={s} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100">{s}</span>)}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- 实习与经历板块 --- */}
        {activeTab === 'exp' && (
          <div className="animate-fade-in pt-8">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800">
              <Briefcase className="text-blue-600" size={32} /> <Editable isEditMode={isEditMode} text={t.exp.title} onChange={(v) => updateData(['exp', 'title'], v)} />
            </h2>
            <div className="space-y-12">
              {t.exp.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 max-h-[500px] md:max-h-[60vh] overflow-y-auto custom-scrollbar relative">
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                      <div className="w-full">
                        <Editable isEditMode={isEditMode} text={item.company} onChange={(v) => updateData(['exp', 'items', idx, 'company'], v)} tag="h3" className="text-2xl font-bold text-slate-900 block w-full" />
                        <Editable isEditMode={isEditMode} text={item.role} onChange={(v) => updateData(['exp', 'items', idx, 'role'], v)} tag="p" className="text-blue-600 font-semibold text-lg mt-1 block w-full" />
                      </div>
                      <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium shrink-0 w-max">
                        <Calendar size={16} /> <Editable isEditMode={isEditMode} text={item.date} onChange={(v) => updateData(['exp', 'items', idx, 'date'], v)} />
                      </span>
                    </div>

                    <Editable isEditMode={isEditMode} text={item.desc} onChange={(v) => updateData(['exp', 'items', idx, 'desc'], v)} tag="p" className="text-slate-700 text-lg mb-6 italic border-l-4 border-blue-500 pl-4 bg-slate-50 py-2 pr-2 rounded-r-lg block" />

                    <ul className="space-y-3 mb-8">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <ChevronRight className="shrink-0 text-blue-500 mt-1" size={18} />
                          <Editable isEditMode={isEditMode} text={point} onChange={(v) => updateData(['exp', 'items', idx, 'points', i], v)} className="leading-relaxed block w-full" />
                        </li>
                      ))}
                    </ul>

                    <DynamicGallery
                      isEditMode={isEditMode} initialImages={item.images} onImageClick={setLightboxImg}
                      layoutConfig={galleryConfigs[`exp_${idx}`] || defaultLayout}
                      onLayoutChange={(c) => updateGalleryConfig(`exp_${idx}`, c)}
                      onImagesChange={(imgs) => updateData(['exp', 'items', idx, 'images'], imgs)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 生活板块 --- */}
        {activeTab === 'life' && (
          <div className="animate-fade-in pt-8">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800">
              <Compass className="text-blue-600" size={32} /> <Editable isEditMode={isEditMode} text={t.life.title} onChange={(v) => updateData(['life', 'title'], v)} />
            </h2>
            <div className="space-y-12">
              {['football', 'innovation'].map((key) => {
                const section = t.life[key];
                return (
                  <div key={key} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 max-h-[500px] md:max-h-[60vh] overflow-y-auto custom-scrollbar relative">
                    <div className="p-8 md:p-10">
                      <Editable isEditMode={isEditMode} text={section.title} onChange={(v) => updateData(['life', key, 'title'], v)} tag="h3" className="text-2xl font-bold text-slate-900 mb-2 block w-full" />
                      <Editable isEditMode={isEditMode} text={section.desc} onChange={(v) => updateData(['life', key, 'desc'], v)} tag="p" className={`font-medium mb-8 text-lg block w-full ${key === 'football' ? 'text-blue-600' : 'text-emerald-600'}`} />

                      <ul className="space-y-3 mb-10">
                        {section.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600">
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${key === 'football' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                            <Editable isEditMode={isEditMode} text={point} onChange={(v) => updateData(['life', key, 'points', i], v)} className="leading-relaxed block w-full" />
                          </li>
                        ))}
                      </ul>
                      <DynamicGallery
                        isEditMode={isEditMode} initialImages={section.images} onImageClick={setLightboxImg}
                        layoutConfig={galleryConfigs[`life_${key}`] || defaultLayout}
                        onLayoutChange={(c) => updateGalleryConfig(`life_${key}`, c)}
                        onImagesChange={(imgs) => updateData(['life', key, 'images'], imgs)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* --- 全局悬浮控制器 (开启编辑模式) --- */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col gap-3 z-50">
        {isEditMode && (
          <button onClick={() => setShowExportModal(true)} className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center hover:scale-105 tooltip-btn group relative">
            <FileJson size={24} />
            <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">导出最新数据</span>
          </button>
        )}
        <button onClick={() => setIsEditMode(!isEditMode)} className={`${isEditMode ? 'bg-slate-800' : 'bg-blue-600'} text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center group relative`}>
          {isEditMode ? <Save size={24} /> : <Edit3 size={24} />}
          <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            {isEditMode ? "保存排版并退出" : "开启可视化编辑"}
          </span>
        </button>
      </div>

      {/* 导出数据弹窗 */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><FileJson className="text-emerald-600" /> 导出最新简历数据</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-800 text-green-400 font-mono text-sm">
              <p className="text-slate-400 mb-4 font-sans">⚠️ <b>重要说明</b>：因为这是一个无后端的纯静态网页，你在浏览器中修改的内容仅保存在当前电脑上。<br />如需让你分享的二维码展示最新内容，请复制下方的代码，在本地 `App.jsx` 代码文件中替换掉原来的 <b>`const initialDict = {'{...}'}`</b> 部分，然后重新推送到 GitHub 即可永久生效。</p>
              <pre className="whitespace-pre-wrap word-break">
                {`const initialDict = ${JSON.stringify(resumeData, null, 2)};`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 全局图片放大预览层 */}
      {lightboxImg && <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}
    </div>
  );
}