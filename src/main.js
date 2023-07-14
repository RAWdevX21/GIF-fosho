#!usr/bin/env giffosho
import React from "react";
import ReactDOM from 'react-dom';
import { css } from '@leafygreen-ui/emotion';
import { ReactComponent as GiphyLogo } from './giphy-logo.svg';
import { SideNav, SideNavGroup } from "@leafygreen-ui/side-nav";
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

function App() {
  const navMainItems = [
    { name: "HOME", href: "/home" },
    { name: "ABOUT GIF-FO'SHO", href: "/about" },
    { name: "TRENDING", href: "/trending" },
    { name: "POPULAR", href: "/popular" },
    { name: "EXPLORE", href: "/explore" },
    { name: "PRODUCTS", href: "/products" },
    { name: "HELP", href: "/help" },
    { name: "CONTACT", href: "/contact" }
  ];
  const navContentItems = [
    { name: "CLIPS", href: "/clips" },
    { name: "GIFS", href: "/gifs" },
    { name: "STICKERS", href: "/stickers" },
    { name: "TEXT", href: "/text" },
    { name: "EMOJI", href: "/emoji" },
    { name: "GIPHY TEXT", href: "/giphy-text" },
    { name: "GIPHY ALT TEXT", href: "/giphy-alt-text" }
  ];
  const navLibraryItems = [
    { name: "CURATED LIBRARY", href: "/curated-library" },
    { name: "CONTENT PARTNERS", href: "/content-partners" },
    { name: "ORIGINALS AND ARTISTS", href: "/originals-and-artists" },
    { name: "REAL TIME", href: "/real-time" },
    { name: "DIVERSITY AND INCLUSION", href: "/diversity-and-inclusion" }
  ];

  return (
    <div>
      <SideNav
        widthOverride={300}
        className={css`
          height: 100vh; // sets height of SideNav
        `}
        items={navMainItems}
        activeItem={activeNavItem}
        onItemClick={handleNavItemClick}
      />
      <SideNavGroup
        header="CONTENT"
        collapsible
        glyph={<GiphyLogo/>}
        items={navContentItems}
        onItemClick={handleNavItemClick}
        >
        <SideNavGroup header="LIBRARY"
        items={navLibraryItems}
        onItemClick={handleNavItemClick}
        >
        </SideNavGroup>
      </SideNavGroup>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.zone.SideNav'));

export default App;  