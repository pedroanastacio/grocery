import React, { memo } from 'react';
import * as S from './style';

type Props = {
  children: string | undefined
}

const FormFieldError: React.FC<Props> = ({ children }) => {
	return (
		<S.WrapperErrorMessage>{children}</S.WrapperErrorMessage>
	);
};

export default memo(FormFieldError);