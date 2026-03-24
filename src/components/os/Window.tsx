import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import colors from '../../constants/colors';
import Colors from '../../constants/colors';
import Icon from '../general/Icon';
import Button from './Button';
import DragIndicator from './DragIndicator';
import ResizeIndicator from './ResizeIndicator';

export interface WindowProps {
    closeWindow: () => void;
    minimizeWindow: () => void;
    onInteract: () => void;
    width: number;
    height: number;
    top: number;
    left: number;
    windowTitle?: string;
    bottomLeftText?: string;
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName;
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    const dragProps = useRef<{
        dragStartX: any;
        dragStartY: any;
    }>();

    const resizeRef = useRef<any>(null);

    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    const lastClickInside = useRef(false);

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [contentWidth, setContentWidth] = useState(props.width);
    const [contentHeight, setContentHeight] = useState(props.height);

    const [windowActive, setWindowActive] = useState(true);

    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({
        width,
        height,
        top,
        left,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize, false);
        window.addEventListener('mouseup', stopResize, false);
    };

    const onResize = ({ clientX, clientY }: any) => {
        const curWidth = clientX - left;
        const curHeight = clientY - top;
        if (curWidth > 520) resizeRef.current.style.width = `${curWidth}px`;
        if (curHeight > 220) resizeRef.current.style.height = `${curHeight}px`;
        resizeRef.current.style.opacity = 1;
    };

    const stopResize = () => {
        setIsResizing(false);
        setWidth(resizeRef.current.style.width);
        setHeight(resizeRef.current.style.height);
        resizeRef.current.style.opacity = 0;
        window.removeEventListener('mousemove', onResize, false);
        window.removeEventListener('mouseup', stopResize, false);
    };

    const startDrag = (event: any) => {
        const { clientX, clientY } = event;
        setIsDragging(true);
        event.preventDefault();
        dragProps.current = {
            dragStartX: clientX,
            dragStartY: clientY,
        };
        window.addEventListener('mousemove', onDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        let { x, y } = getXYFromDragProps(clientX, clientY);
        dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragRef.current.style.opacity = 1;
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        // dragRef.current.style.opacity = 0;
        const { x, y } = getXYFromDragProps(clientX, clientY);
        setTop(y);
        setLeft(x);
        window.removeEventListener('mousemove', onDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    };

    const getXYFromDragProps = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;

        const x = clientX - dragStartX + left;
        const y = clientY - dragStartY + top;

        return { x, y };
    };

    useEffect(() => {
        dragRef.current.style.transform = `translate(${left}px, ${top}px)`;
    });

    useEffect(() => {
        props.onWidthChange && props.onWidthChange(contentWidth);
    }, [props.onWidthChange, contentWidth]); // eslint-disable-line

    useEffect(() => {
        props.onHeightChange && props.onHeightChange(contentHeight);
    }, [props.onHeightChange, contentHeight]); // eslint-disable-line

    useEffect(() => {
        setContentWidth(contentRef.current.getBoundingClientRect().width);
    }, [width]);

    useEffect(() => {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
    }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({
                width,
                height,
                top,
                left,
            });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 32);
            setTop(0);
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setWindowActive(true);
        } else {
            setWindowActive(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, {
                    width,
                    height,
                    top,
                    left,
                })}
                ref={windowRef}
            >
                <div style={styles.windowBorderOuter}>
                    <div style={styles.windowBorderInner}>
                        <div
                            style={styles.dragHitbox}
                            onMouseDown={startDrag}
                        ></div>
                        <div
                            className={props.rainbow ? 'rainbow-wrapper' : ''}
                            style={Object.assign(
                                {},
                                styles.topBar,
                                props.windowBarColor && {
                                    backgroundColor: props.windowBarColor,
                                },
                                !windowActive && {
                                    background: 'linear-gradient(to bottom, #BFBFBF 0%, #8A8A8A 50%, #8A8A8A 50%, #8A8A8A 100%)',
                                }
                            )}
                        >
                            <div style={styles.windowHeader}>
                                {props.windowBarIcon ? (
                                    <Icon
                                        icon={props.windowBarIcon}
                                        style={Object.assign(
                                            {},
                                            styles.windowBarIcon,
                                            !windowActive && { opacity: 0.5 }
                                        )}
                                        size={16}
                                    />
                                ) : (
                                    <div style={{ width: 16 }} />
                                )}
                                <p
                                    style={
                                        windowActive
                                            ? {}
                                            : { color: colors.lightGray }
                                    }
                                    className="showcase-header"
                                >
                                    {props.windowTitle}
                                </p>
                            </div>
                            <div style={styles.windowTopButtons}>
                                <Button
                                    icon="minimize"
                                    onClick={props.minimizeWindow}
                                />
                                <Button icon="maximize" onClick={maximize} />
                                <div style={{ paddingLeft: 2 }}>
                                    <Button
                                        icon="close"
                                        onClick={props.closeWindow}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={Object.assign({}, styles.contentOuter, {
                                // zIndex: isDragging || isResizing ? 0 : 100,
                            })}
                        >
                            <div style={styles.contentInner}>
                                <div style={styles.content} ref={contentRef}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                        <div
                            onMouseDown={startResize}
                            style={styles.resizeHitbox}
                        ></div>
                        <div style={styles.bottomBar}>
                            <div
                                style={Object.assign({}, styles.insetBorder, {
                                    flex: 5 / 7,
                                    alignItems: 'center',
                                })}
                            >
                                <p
                                    style={{
                                        fontSize: 12,
                                        marginLeft: 4,
                                        fontFamily: 'MSSerif',
                                    }}
                                >
                                    {props.bottomLeftText}
                                </p>
                            </div>
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomSpacer
                                )}
                            />
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomSpacer
                                )}
                            />
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomResizeContainer
                                )}
                            >
                                <div
                                    style={{
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Icon size={12} icon="windowResize" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={
                    !isResizing
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'nwse-resize',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <ResizeIndicator
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    resizeRef={resizeRef}
                />
            </div>
            <div
                style={
                    !isDragging
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'move',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <DragIndicator
                    width={width}
                    height={height}
                    dragRef={dragRef}
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    /*
    window: {
        backgroundColor: Colors.lightGray,
        position: 'absolute',
    },
    */
    window: {
        backgroundColor: '#ECE9D8', // XP window background color
        position: 'absolute',
        borderRadius: '8px 8px 0 0', // Rounded top corners like XP
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    },
    dragHitbox: {
        position: 'absolute',
        width: 'calc(100% - 70px)',
        height: 48,
        zIndex: 10000,
        top: 0, //-8
        left: 0, //-4
        cursor: 'move',
    },
    /*
    windowBorderOuter: {
        border: `1px solid ${Colors.black}`,
        borderTopColor: colors.lightGray,
        borderLeftColor: colors.lightGray,
        flex: 1,
    },
    windowBorderInner: {
        border: `1px solid ${Colors.darkGray}`,
        borderTopColor: colors.white,
        borderLeftColor: colors.white,
        flex: 1,
        padding: 2,

        flexDirection: 'column',
    },
    */
    windowBorderOuter: {
        border: '1px solid #0054E3', // XP blue border
        borderRadius: '8px 8px 0 0',
        flex: 1,
    },
    windowBorderInner: {
        border: 'none', // Remove inner border for cleaner XP look
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        borderRadius: '7px 7px 0 0',
    },
    resizeHitbox: {
        position: 'absolute',
        width: 20, //60
        height: 20, //60
        bottom: 0, //-20
        right: 0, //-20
        cursor: 'nwse-resize',
    },
    /*
    topBar: {
        backgroundColor: Colors.blue,
        width: '100%',
        height: 20,

        alignItems: 'center',
        paddingRight: 2,
        boxSizing: 'border-box',
    },
    contentOuter: {
        border: `1px solid ${Colors.white}`,
        borderTopColor: colors.darkGray,
        borderLeftColor: colors.darkGray,
        flexGrow: 1,

        marginTop: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    contentInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderTopColor: colors.black,
        borderLeftColor: colors.black,
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,

        position: 'relative',
        // overflow: 'scroll',
        overflowX: 'hidden',
        backgroundColor: Colors.white,
    },
    */
    topBar: {
        background: 'linear-gradient(to bottom, #2E5BDA 0%, #1941A5 50%, #1941A5 50%, #1941A5 100%)', // XP blue gradient
        width: '100%',
        height: 30, // Taller title bar like XP
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 4,
        boxSizing: 'border-box',
        borderRadius: '7px 7px 0 0',
        borderBottom: '1px solid #316AC5',
    },
    contentOuter: {
        border: '1px solid #ACA899', // XP content border color
        borderTop: '1px solid #FFFFFF',
        borderLeft: '1px solid #FFFFFF',
        flexGrow: 1,
        margin: '2px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    contentInner: {
        border: '1px solid #ACA899',
        borderTop: '1px solid #DFDFDF',
        borderLeft: '1px solid #DFDFDF',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: '#FFFFFF',
        padding: '4px', // Add some padding like XP
    },
    bottomBar: {
        flexShrink: 1,
        width: '100%',
        height: 22, // Slightly taller status bar
        backgroundColor: '#ECE9D8',
        borderTop: '1px solid #ACA899',
        alignItems: 'center',
    },
    bottomSpacer: {
        width: 16,
        marginLeft: 2,
        height: 16,
        backgroundColor: '#ECE9D8',
    },
    insetBorder: {
        border: '1px solid #ACA899',
        borderTop: '1px solid #FFFFFF',
        borderLeft: '1px solid #FFFFFF',
        padding: 2,
        backgroundColor: '#ECE9D8',
    },
    bottomResizeContainer: {
        flex: 2 / 7,
        justifyContent: 'flex-end',
        padding: 2,
        marginLeft: 2,
        backgroundColor: '#ECE9D8',
    },
    windowTopButtons: {
        // zIndex: 10000,

        alignItems: 'center',
        gap: '2px',
    },
    windowHeader: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 4,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    windowBarIcon: {
        paddingRight: 8,
    },
    container: {
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))', 
    }
};

export default Window;
