import cl from './index.module.css'

function Gooey() {
  return (
    <div className={cl.gooey}>
      <span className={cl.dot}></span>
      <div className={cl.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Gooey;
