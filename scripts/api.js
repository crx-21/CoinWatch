/**
 * API Utility Module
 * Handles communication with the free API.
 */

const API_CONFIG = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    SIMULATE_ERROR: false,
};

const MOCK_JOBS = [
    { id: 1, title: 'Senior ML Engineer', company: 'DeepMind', location: 'London, UK', category: 'Machine Learning', level: 'Senior', salary: '$200k - $300k', description: 'Lead the development of next-generation LLMs. Focus on efficiency, scaling, and alignment.', url_slug: 'deepmind-ml-eng' },
    { id: 2, title: 'AI Research Scientist', company: 'OpenAI', location: 'San Francisco, CA', category: 'AI Research', level: 'Expert', salary: '$250k - $400k', description: 'Push the boundaries of AGI. Work on multimodal models and reasoning capabilities.', url_slug: 'openai-research' },
    { id: 3, title: 'Computer Vision Engineer', company: 'Tesla', location: 'Palo Alto, CA', category: 'Computer Vision', level: 'Mid', salary: '$150k - $220k', description: 'Implement real-time object detection and segmentation for autonomous driving.', url_slug: 'tesla-cv-eng' },
    { id: 4, title: 'NLP Engineer', company: 'Anthropic', location: 'Remote', category: 'NLP', level: 'Senior', salary: '$180k - $280k', description: 'Design constitutional AI and improve model safety and interpretability.', url_slug: 'anthropic-nlp' },
    { id: 5, title: 'MLOps Architect', company: 'Google', location: 'Mountain View, CA', category: 'MLOps', level: 'Principal', salary: '$220k - $350k', description: 'Scale ML infrastructure for billions of users. Focus on Vertex AI integration.', url_slug: 'google-mlops' },
    { id: 6, title: 'AI Product Manager', company: 'Microsoft', location: 'Redmond, WA', category: 'Product', level: 'Mid', salary: '$140k - $200k', description: 'Bridge the gap between research and product for Copilot integrations.', url_slug: 'ms-ai-pm' },
    { id: 7, title: 'Data Scientist (AI)', company: 'Meta', location: 'Menlo Park, CA', category: 'Data Science', level: 'Senior', salary: '$190k - $270k', description: 'Analyze user behavior to optimize recommendation algorithms for Reels.', url_slug: 'meta-ds' },
    { id: 8, title: 'AI Software Engineer', company: 'NVIDIA', location: 'Santa Clara, CA', category: 'AI Engineering', level: 'Mid', salary: '$160k - $230k', description: 'Optimize CUDA kernels for the latest H100 GPU architectures.', url_slug: 'nvidia-ai-sw' },
    { id: 9, title: 'ML Research Engineer', company: 'Mistral AI', location: 'Paris, France', category: 'AI Research', level: 'Senior', salary: '€120k - €180k', description: 'Develop high-performance open-weights models for diverse languages.', url_slug: 'mistral-res' },
    { id: 10, title: 'AI Ethics Specialist', company: 'DeepL', location: 'Cologne, Germany', category: 'Ethics', level: 'Mid', salary: '€90k - €130k', description: 'Ensure translation models are unbiased and culturally sensitive.', url_slug: 'deepl-ethics' },
    { id: 11, title: 'Generative AI Engineer', company: 'Midjourney', location: 'Remote', category: 'GenAI', level: 'Senior', salary: '$170k - $250k', description: 'Innovate new diffusion techniques for high-fidelity image generation.', url_slug: 'midjourney-genai' },
    { id: 12, title: 'Robotics ML Engineer', company: 'Boston Dynamics', location: 'Waltham, MA', category: 'Robotics', level: 'Mid', salary: '$140k - $210k', description: 'Implement reinforcement learning for agile humanoid movement.', url_slug: 'bd-robotics' },
    { id: 13, title: 'AI Platform Engineer', company: 'Amazon', location: 'Seattle, WA', category: 'Platform', level: 'Senior', salary: '$180k - $260k', description: 'Build scalable training clusters for SageMaker internal needs.', url_slug: 'aws-platform' },
    { id: 14, title: 'Speech Recognition Eng', company: 'Apple', location: 'Cupertino, CA', category: 'Speech', level: 'Mid', salary: '$160k - $240k', description: 'Improve Siri accuracy using latest transformer-based ASR models.', url_slug: 'apple-speech' },
    { id: 15, title: 'ML Security Engineer', company: 'CrowdStrike', location: 'Austin, TX', category: 'Security', level: 'Senior', salary: '$170k - $240k', description: 'Detect adversarial attacks on ML models in production environments.', url_slug: 'crowdstrike-sec' },
    { id: 16, title: 'AI Quant Researcher', company: 'Jane Street', location: 'New York, NY', category: 'Finance', level: 'Expert', salary: '$300k - $600k', description: 'Apply deep learning to predict high-frequency market movements.', url_slug: 'jane-street-quant' },
    { id: 17, title: 'AI Health Scientist', company: 'Recursion', location: 'Salt Lake City, UT', category: 'Health', level: 'PhD', salary: '$150k - $210k', description: 'Use ML to identify new drug candidates for rare diseases.', url_slug: 'recursion-health' },
    { id: 18, title: 'ML Consultant', company: 'BCG X', location: 'New York, NY', category: 'Consulting', level: 'Mid', salary: '$130k - $190k', description: 'Help Fortune 500 companies integrate AI into their core workflows.', url_slug: 'bcg-ml' },
    { id: 19, title: 'AI Infrastructure Eng', company: 'CoreWeave', location: 'Remote', category: 'Infrastructure', level: 'Senior', salary: '$180k - $250k', description: 'Build specialized GPU clouds for the generative AI era.', url_slug: 'coreweave-infra' },
    { id: 20, title: 'Agentic AI Developer', company: 'AutoGPT', location: 'Remote', category: 'Agents', level: 'Mid', salary: '$120k - $180k', description: 'Create autonomous agents capable of multi-step complex reasoning.', url_slug: 'autogpt-dev' },
];

async function apiFetch(endpoint) {
    if (API_CONFIG.SIMULATE_ERROR) {
        await new Promise(resolve => setTimeout(resolve, 800));
        throw new Error('Network Error: Unable to connect to the job server. Please check your connection or try again later.');
    }

    // For this project requirement, we return our MOCK_JOBS array
    // If an endpoint is provided, we simulate a filtered response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ jobs: MOCK_JOBS });
        }, 500);
    });
}

window.apiFetch = apiFetch;
