import React, { useMemo } from 'react';

const FloatingHearts = () => {
    const hearts = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * (30 - 10) + 10}px`,
            duration: `${Math.random() * (15 - 5) + 5}s`,
            delay: `${Math.random() * 10}s`,
        }));
    }, []);

    return (
        <div className="hearts-container">
            {hearts.map((heart) => (
                <span
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: heart.left,
                        fontSize: heart.size,
                        animationDuration: heart.duration,
                        animationDelay: heart.delay,
                        bottom: '-50px'
                    }}
                >
                    ❤️
                </span>
            ))}
        </div>
    );
};

export default FloatingHearts;
