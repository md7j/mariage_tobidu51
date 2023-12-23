import './cover_image.css';

function CoverImage(props) {
    const {
      fade,
      contrast
    } = props

    return (
      <div className={`cover-image ${fade ? 'fade' : ''}`}/>
    );
  }
  
  export default CoverImage;
  