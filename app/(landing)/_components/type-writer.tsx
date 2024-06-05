"use client";
import React from 'react';
import { Typewriter } from 'nextjs-simple-typewriter';
import { Aclonica } from "next/font/google";

const font = Aclonica({
    weight: '400',
    subsets: ['latin']
});

export const TypingEffect = () => {

    const handleType = (count: number) => {
        // Access word count number
        console.log(count);
    }

    const handleDone = () => {
        console.log(`Done after 5 loops!`);
    }

    return (
        <div className={font.className}>
            <div className='App'>
                <div className='mb-7'>
                    <h1 style={{ paddingTop: '1rem', margin: 'auto 0', fontWeight: 'bold', fontSize: '1.6rem' }}>
                        CODE: {' '}
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                            {/* Style will be inherited from the parent element */}
                            <Typewriter
                                words={['Capture', 'Organize', 'Distill', 'Express']}
                                loop={20}
                                cursor
                                cursorStyle='/'
                                typeSpeed={100}
                                deleteSpeed={100}
                                delaySpeed={500}
                                onLoopDone={handleDone}
                                onType={handleType}
                            />
                        </span>
                    </h1>
                </div>

            </div>
        </div>

    );
}
