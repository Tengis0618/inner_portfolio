import React, { useState, CSSProperties } from 'react';

interface PathNavBarProps {
  currentDirectory: string;
  onViewModeChange?: (mode: 'icons' | 'details') => void;
  onNavigate?: (path: string) => void;
  onMenuClick?: (menu: string) => void;
}

interface MenuItem {
  label: string;
  items: string[];
}

interface StyleSheetCSS {
  [key: string]: CSSProperties;
}

const PathNavBar: React.FC<PathNavBarProps> = ({
  currentDirectory,
  onViewModeChange,
  onNavigate,
  onMenuClick
}) => {
  const [addressValue, setAddressValue] = useState(`C:\\Portfolio\\${currentDirectory}`);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState<'icons' | 'details'>('icons');

  const styles: StyleSheetCSS = {
    container: {
      position: 'relative'
    },
    toolbar: {
      background: 'linear-gradient(to bottom, #f3f4f6, #e5e7eb)',
      borderBottom: '1px solid #d1d5db',
      padding: '4px 8px'
    },
    toolbarContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      position: 'relative'
    },
    menuContainer: {
      position: 'relative'
    },
    menuButton: {
      padding: '4px 12px',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    },
    menuButtonHover: {
      backgroundColor: '#dbeafe'
    },
    menuButtonActive: {
      backgroundColor: '#bfdbfe',
      border: '1px solid #93c5fd'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: 'white',
      border: '1px solid #9ca3af',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      minWidth: '192px',
      zIndex: 50
    },
    dropdownItem: {
      width: '100%',
      textAlign: 'left',
      padding: '8px 16px',
      fontSize: '14px',
      border: 'none',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    dropdownItemHover: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    dropdownItemLast: {
      borderBottom: 'none'
    },
    addressBar: {
      backgroundColor: 'white',
      borderBottom: '1px solid #d1d5db',
      padding: '8px'
    },
    addressContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    addressLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    addressText: {
      fontSize: '14px',
      color: '#4b5563'
    },
    addressIcon: {
      fontSize: '18px'
    },
    addressInput: {
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      padding: '4px 12px',
      flex: 1,
      fontSize: '14px',
      fontFamily: 'Consolas, "Courier New", monospace',
      outline: 'none'
    },
    addressInputFocus: {
      borderColor: '#60a5fa',
      backgroundColor: 'white'
    },
    goButton: {
      backgroundColor: '#e5e7eb',
      border: '1px solid #9ca3af',
      padding: '4px 16px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    goButtonHover: {
      backgroundColor: '#d1d5db'
    },
    goButtonActive: {
      backgroundColor: '#9ca3af'
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px',
      fontSize: '12px',
      color: '#2563eb'
    },
    breadcrumbButton: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    breadcrumbButtonHover: {
      textDecoration: 'underline'
    },
    breadcrumbSeparator: {
      color: '#9ca3af'
    },
    breadcrumbCurrent: {
      color: '#1f2937',
      fontWeight: '500'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40
    },
    viewModeIndicator: {
      fontSize: '14px'
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: 'File',
      items: ['New', 'Open', 'Save', 'Print', 'Properties', 'Exit']
    },
    {
      label: 'Edit',
      items: ['Undo', 'Cut', 'Copy', 'Paste', 'Select All', 'Find']
    },
    {
      label: 'View',
      items: ['Icons', 'List', 'Details', 'Thumbnails', 'Refresh', 'Folder Options']
    },
    {
      label: 'Tools',
      items: ['Map Network Drive', 'Disconnect Network Drive', 'Folder Options']
    },
    {
      label: 'Help',
      items: ['Help Topics', 'About Windows']
    }
  ];

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
    onMenuClick?.(menuLabel);
  };

  const handleMenuItemClick = (menuLabel: string, item: string) => {
    setActiveMenu(null);
    
    if (menuLabel === 'View') {
      if (item === 'Icons') {
        setCurrentViewMode('icons');
        onViewModeChange?.('icons');
      } else if (item === 'Details') {
        setCurrentViewMode('details');
        onViewModeChange?.('details');
      }
    }
    
    console.log(`${menuLabel} -> ${item} clicked`);
  };

  const handleGoClick = () => {
    onNavigate?.(addressValue);
  };

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [hoveredBreadcrumb, setHoveredBreadcrumb] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isGoButtonHovered, setIsGoButtonHovered] = useState(false);
  const [isGoButtonActive, setIsGoButtonActive] = useState(false);

  return (
    <div style={styles.container}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarContent}>
          {menuItems.map((menu) => (
            <div key={menu.label} style={styles.menuContainer}>
              <button
                style={{
                  ...styles.menuButton,
                  ...(hoveredMenu === menu.label ? styles.menuButtonHover : {}),
                  ...(activeMenu === menu.label ? styles.menuButtonActive : {})
                }}
                onClick={() => handleMenuClick(menu.label)}
                onMouseEnter={() => {
                  setHoveredMenu(menu.label);
                  if (activeMenu) setActiveMenu(menu.label);
                }}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {menu.label}
              </button>
              
              {/* Dropdown Menu */}
              {activeMenu === menu.label && (
                <div style={styles.dropdown}>
                  {menu.items.map((item, index) => (
                    <button
                      key={item}
                      style={{
                        ...styles.dropdownItem,
                        ...(hoveredMenuItem === item ? styles.dropdownItemHover : {}),
                        ...(index === menu.items.length - 1 ? styles.dropdownItemLast : {})
                      }}
                      onClick={() => handleMenuItemClick(menu.label, item)}
                      onMouseEnter={() => setHoveredMenuItem(item)}
                      onMouseLeave={() => setHoveredMenuItem(null)}
                    >
                      <span>{item}</span>
                      {menu.label === 'View' && (
                        <>
                          {item === 'Icons' && currentViewMode === 'icons' && <span style={styles.viewModeIndicator}>●</span>}
                          {item === 'Details' && currentViewMode === 'details' && <span style={styles.viewModeIndicator}>●</span>}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Address Bar */}
      <div style={styles.addressBar}>
        <div style={styles.addressContent}>
          <div style={styles.addressLabel}>
            <span style={styles.addressText}>Address</span>
            <span style={styles.addressIcon}>📁</span>
          </div>
          
          <input
            type="text"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGoClick()}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            style={{
              ...styles.addressInput,
              ...(isInputFocused ? styles.addressInputFocus : {})
            }}
          />
          
          <button
            type="button"
            onClick={handleGoClick}
            onMouseEnter={() => setIsGoButtonHovered(true)}
            onMouseLeave={() => setIsGoButtonHovered(false)}
            onMouseDown={() => setIsGoButtonActive(true)}
            onMouseUp={() => setIsGoButtonActive(false)}
            style={{
              ...styles.goButton,
              ...(isGoButtonHovered ? styles.goButtonHover : {}),
              ...(isGoButtonActive ? styles.goButtonActive : {})
            }}
          >
            Go
          </button>
        </div>
        
        {/* Breadcrumb Navigation */}
        <div style={styles.breadcrumb}>
          <button 
            style={{
              ...styles.breadcrumbButton,
              ...(hoveredBreadcrumb === 'computer' ? styles.breadcrumbButtonHover : {})
            }}
            onClick={() => onNavigate?.('C:\\')}
            onMouseEnter={() => setHoveredBreadcrumb('computer')}
            onMouseLeave={() => setHoveredBreadcrumb(null)}
          >
            My Computer
          </button>
          <span style={styles.breadcrumbSeparator}>{'>'}</span>
          <button 
            style={{
              ...styles.breadcrumbButton,
              ...(hoveredBreadcrumb === 'portfolio' ? styles.breadcrumbButtonHover : {})
            }}
            onClick={() => onNavigate?.('C:\\Portfolio')}
            onMouseEnter={() => setHoveredBreadcrumb('portfolio')}
            onMouseLeave={() => setHoveredBreadcrumb(null)}
          >
            Portfolio
          </button>
          <span style={styles.breadcrumbSeparator}>{'>'}</span>
          <span style={styles.breadcrumbCurrent}>{currentDirectory}</span>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {activeMenu && (
        <div 
          style={styles.overlay}
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
};

export default PathNavBar;