import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import './inputFile.css';

type IProps = {
  register: UseFormRegisterReturn;
};

const InputFile = ({ register }: IProps) => {
  const [file, setFile] = useState('');
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value);
  };

  const textInput = file === '' ? 'Select avatar' : file;
  return (
    <div className="wraper-input-file">
      <label htmlFor="avatar" className="label-input-file">
        <span className="icon-file">
          <img src="./../assets/jpg/download.jpg" alt="icon-file" />
        </span>
        <p className="file-text">{textInput}</p>
        <input
          {...register}
          className="input-file"
          type="file"
          name="avatar"
          data-testid="input-avatar"
          onChange={(e) => handleChangeFile(e)}
        />
      </label>
    </div>
  );
};
export default InputFile;
