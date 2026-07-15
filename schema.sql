
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT unique NOT NULL,
    title TEXT ,
    experience_level TEXT ,
    password TEXT,
    cv_link TEXT 
);
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL 
);
CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    UNIQUE (user_id,skill_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (skill_id) REFERENCES skills (id)    
);
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    link TEXT NOT NULL,
    title TEXT NOT NULL,
    date DATE,
    experience_level TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS job_skills (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    unique (job_id,skill_id),
    FOREIGN KEY (job_id) REFERENCES jobs (id),
    FOREIGN KEY (skill_id) REFERENCES skills (id)

);
CREATE TABLE IF NOT EXISTS saved_jobs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    email_sent BOOL,
    matching_score DECIMAL (5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES jobs (id)   
);
CREATE TABLE IF NOT EXISTS auth_providers(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    provider TEXT NOT NULL,
    provider_user_id TEXT NOT NULL,
    access_token TEXT NOT NULL,
    expired_at TIMESTAMP,
    UNIQUE (provider,provider_user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);


