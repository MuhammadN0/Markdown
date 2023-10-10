/* eslint-disable jsx-a11y/img-redundant-alt */
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';
import { useNavigate } from 'react-router-dom';
import UpdatePasswordForm from './UpdatePasswordForm';
import Spinner from '../../ui/Spinner';
export const Form = styled.form`
  margin-top: 30px;
`;
export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
  & label {
    font-size: 16px;
  }
  & input {
    flex: 1;
    padding: 5px;
    font-size: 16px;
  }
  & input[type='file'] {
    display: none;
  }
  & .custom {
    cursor: pointer;
    background-color: var(--dark-terkoiz);
    padding: 5px 10px;
    color: white;
    border-radius: 4px;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 40px;
  & > button {
    background-color: var(--darker-terkoiz);
    padding: 5px 10px;
    color: white;
    font-size: 16px;
    border-radius: 4px;
  }
`;
const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  & > img {
    max-width: 77px;
    height: 77px;
    border-radius: 50%;
  }
`;
const Img = styled.div`
  width: 77px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
`;
function UpdateUserForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { updateUser, isLoading } = useUpdateUser();

  function onSubmit({ profilePicture, displayName }) {
    if (!displayName.length && !profilePicture) return;
    if (profilePicture.length === 0) {
      updateUser(
        { displayName, profilePicture: null },
        {
          onSettled: () => navigate('/'),
        }
      );
    } else {
      updateUser(
        { displayName, profilePicture: profilePicture[0] },
        {
          onSettled: () => navigate('/'),
        }
      );
    }
  }

  // function onSubmitPassword({password}){
  //   updatePassword(password)
  // }
  if (isLoading) return <Spinner />;
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfilePicture>
          <p>Your profile picture:</p>
          <Img src={currentUser?.photoURL} alt="Your profile picture"></Img>
        </ProfilePicture>
        <h3>Update your name</h3>
        <FormGroup>
          <label htmlFor="displayName">Enter your name</label>
          <input
            defaultValue={currentUser?.displayName}
            type="text"
            name="displayName"
            id="displayName"
            {...register('displayName')}
          />
        </FormGroup>
        <h3>Update your profile picture</h3>
        <FormGroup>
          <label htmlFor="profilePicture">Choose your profile picture</label>
          <label htmlFor="profilePicture" className="custom">
            Choose File
          </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            {...register('profilePicture')}
          />
        </FormGroup>
        <ButtonDiv>
          <button>Submit</button>
        </ButtonDiv>
      </Form>
      <hr />
      <UpdatePasswordForm />
    </>
  );
}

export default UpdateUserForm;
