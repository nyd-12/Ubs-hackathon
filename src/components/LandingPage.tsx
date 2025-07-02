import React from 'react';
import styles from '../styles/LandingPage.module.css';

interface LandingPageProps {
    title?: string;
    description?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ title = "Welcome to My React App", description = "This is a simple landing page." }) => {
    return (
        <div className={styles.landingPage}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default LandingPage;