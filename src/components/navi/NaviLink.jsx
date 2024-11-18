import router from 'next/router';

/**
 * Navigation link without Next.js prefetch.
 */
function NaviLink({ href, children, ...props }) {
  function handleOnClick(e) {
    e.preventDefault();
    router.push(href);
  }

  return (
    <a href={href} {...props} onClick={handleOnClick}>
      {children}
    </a>
  );
}

export default NaviLink;
