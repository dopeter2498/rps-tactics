import { useNavigate } from 'react-router-dom';

const Guest = () => {
  const navigate = useNavigate();

  return (
    <div className='guest'>
      <div className='guest-header'>
        <h2>{'Guest Page'}</h2>
      </div>
      <div className='guest-input'>
        <input
          type='text'
          name='username'
          placeholder='Username'
        />
      </div>
      <button>
        {'Continue'}
      </button>
      <button onClick={() => navigate('../login')}>
        {'Create an Account'}
      </button>
    </div>
  );
}

export default Guest;
