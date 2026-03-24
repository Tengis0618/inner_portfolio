import React, { useState, useEffect } from 'react';

export interface ShutdownSequenceProps {
    numShutdowns: number;
    setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SPEED_MULTIPLIER = 1;

const _F = `>${200 * SPEED_MULTIPLIER}<`;
const _X = `>${500 * SPEED_MULTIPLIER}<`;
const _S = `>${1000 * SPEED_MULTIPLIER}<`;
const _M = `>${2000 * SPEED_MULTIPLIER}<`;
const _L = `>${3000 * SPEED_MULTIPLIER}<`;

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const ShutdownSequence: React.FC<ShutdownSequenceProps> = ({
    numShutdowns,
    setShutdown,
}) => {
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [phase, setPhase] = useState<'shutdown' | 'startup'>('shutdown');

    const getTime = () => {
        const date = new Date();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const time =
            h + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        return time;
    };

    const SHUTDOWN_SEQUENCE = `
╔════════════════════════════════════════════════════════════════════════╗
║                      TENGIS TEMUULEN BIOS SETUP                       ║
║                           Version 1.0.0                                ║
╚════════════════════════════════════════════════════════════════════════╝
${_S}
[${getTime()}] Initiating shutdown sequence...
${_F}
[SYSTEM] Closing active applications...${_F}.${_F}.${_F}. [OK]
[SYSTEM] Saving system state...${_F}.${_F}.${_F}. [OK]
[MEMORY] Flushing RAM cache...${_F}.${_F}.${_F}. [OK]
[DISK] Syncing file system...${_F}.${_F}.${_F}. [OK]
${_S}
[NETWORK] Closing network connections...
  - Ethernet adapter: Disconnected${_F}
  - WiFi adapter: Disconnected${_F}
  - All connections terminated${_F}
${_S}
[PROCESS] Terminating background processes...
  - System Monitor: Stopped${_F}
  - Update Service: Stopped${_F}
  - Security Service: Stopped${_F}
${_S}
[POWER] Preparing power management...
  - CPU: Entering low power state${_F}
  - GPU: Shutting down${_F}
  - Cooling system: Stopping fans${_F}
${_S}
[ACPI] Sending shutdown signal to motherboard...${_M}

System shutdown complete.
${_L}
Power off.
${_M}
    `;

    const STARTUP_SEQUENCE = `
${_M}
Power on detected.
${_S}
╔════════════════════════════════════════════════════════════════════════╗
║                      TENGIS TEMUULEN BIOS SETUP                       ║
║                           Version 1.0.0                                ║
╚════════════════════════════════════════════════════════════════════════╝
${_S}
[${getTime()}] Initiating startup sequence...
${_F}
[POST] Power-On Self-Test...${_F}.${_F}.${_F}. [PASS]
${_S}
[CPU] Detecting processor...
  - Intel Core i7-12700K @ 3.60GHz${_F}
  - 12 Cores, 20 Threads${_F}
  - L1 Cache: 960 KB${_F}
  - L2 Cache: 12 MB${_F}
  - L3 Cache: 25 MB${_F}
${_S}
[MEMORY] Detecting system memory...
  - Total RAM: 32768 MB${_F}
  - Available: 32256 MB${_F}
  - Memory test: [##########] 100%${_F}
  - Status: [OK]${_F}
${_S}
[DISK] Detecting storage devices...
  - Drive 0: Samsung 970 EVO Plus 1TB NVMe${_F}
  - Drive 1: WD Blue 2TB SATA${_F}
  - All drives operational${_F}
${_S}
[VIDEO] Initializing graphics adapter...
  - NVIDIA GeForce RTX 3080${_F}
  - VRAM: 10240 MB${_F}
  - Display initialized${_F}
${_S}
[NETWORK] Initializing network adapters...
  - Ethernet: Intel I225-V${_F}
  - WiFi: Intel AX210${_F}
  - Network stack loaded${_F}
${_S}
[BOOT] Loading operating system...
  - Boot device: Drive 0 (NVMe)${_F}
  - Loading kernel...${_F}.${_F}.${_F}. [OK]
  - Mounting file systems...${_F}.${_F}.${_F}. [OK]
  - Starting services...${_F}.${_F}.${_F}. [OK]
${_M}
[SYSTEM] Boot sequence complete.
${_S}
Welcome back!
${_L}
    `;

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void
    ) => {
        let delayExtra = 0;
        if (i < text.length) {
            if (text[i] === '|') {
                let dumpText = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '|') {
                        i = j + 1;
                        break;
                    }
                    dumpText += text[j];
                }
                setText(curText + dumpText);
                typeText(
                    i,
                    curText + dumpText,
                    text,
                    setText,
                    callback
                );
                return;
            }
            if (text[i] === '>') {
                let delayTime = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '<') {
                        i = j + 1;
                        break;
                    }
                    delayTime += text[j];
                }
                delayExtra = parseInt(delayTime);
            }

            setTimeout(() => {
                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback
                );
            }, 10 + delayExtra);
        } else {
            callback();
        }
    };

    useEffect(() => {
        delay(500).then(() => {
            setLoading(false);
            delay(500).then(() => {
                // Shutdown phase
                typeText(0, '', SHUTDOWN_SEQUENCE, setText, () => {
                    delay(2000).then(() => {
                        setText('');
                        setPhase('startup');
                        // Startup phase
                        typeText(0, '', STARTUP_SEQUENCE, setText, () => {
                            delay(3000).then(() => {
                                setLoading(true);
                                delay(2000).then(() => {
                                    setShutdown(false);
                                });
                            });
                        });
                    });
                });
            });
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div style={styles.container}>
            {loading ? (
                <div style={styles.shutdown}>
                    <span style={styles.cursor}>█</span>
                </div>
            ) : (
                <div style={styles.shutdown}>
                    <pre style={styles.text}>{text}<span style={styles.cursor}>█</span></pre>
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'auto',
        zIndex: 9999,
    },
    shutdown: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#000000',
        padding: '32px',
        boxSizing: 'border-box',
        fontFamily: '"IBM VGA", "Courier New", monospace',
    },
    text: {
        color: '#AAAAAA',
        fontFamily: '"IBM VGA", "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.4',
        whiteSpace: 'pre-wrap',
        margin: 0,
        textShadow: '0 0 2px #AAAAAA',
        display: 'inline',
    },
    cursor: {
        color: '#AAAAAA',
        fontFamily: '"IBM VGA", "Courier New", monospace',
        fontSize: '14px',
        animation: 'blink 1s infinite',
        display: 'inline',
    },
};

export default ShutdownSequence;