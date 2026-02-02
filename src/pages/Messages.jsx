import React from 'react';
import MessageCard from '../components/MessageCard';
import { motion } from 'framer-motion';

const messages = [
    "To my College Sister who became my world: Happy Birthday, Siri! 🌸",
    "They say family is by blood, but 2021 proved that family is by soul. You are more than a sister to me. ✨",
    "From our silly college fights to late-night laughs, those two years (2021-2023) gave me memories for a lifetime. 💖",
    "Even with the distance between us since 2023, our bond hasn't aged a day. You're always right here in my heart. 🌍",
    "You're the best in the world, Siri. Thank you for being my constant, even from miles away. Love you forever! ♾️"
];

const Messages = () => {
    return (
        <div className="section-padding container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="messages-page"
            >
                <h1 className="text-center mb-5" style={{ color: 'var(--accent-color)', fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}>Heartfelt Words</h1>
                <div className="messages-list">
                    {messages.map((ms, index) => (
                        <MessageCard key={index} text={ms} delay={index * 0.2} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Messages;
