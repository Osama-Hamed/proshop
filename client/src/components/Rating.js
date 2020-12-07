const Rating = ({ value, text, color }) => {
  const getIconClass = pos =>
    value >= pos
      ? 'fas fa-star'
      : value >= pos - 0.5
      ? 'fas fa-star-half-alt'
      : 'far fa-star';

  return (
    <div className='rating'>
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          <i style={{ color }} className={getIconClass(i + 1)}></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#F8E825',
};

export default Rating;
