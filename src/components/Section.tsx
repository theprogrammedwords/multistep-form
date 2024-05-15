import { readableKeyString, toTitleCase } from '../utils/appUtils';
import { loanData } from './DynamicForm';
import { PreviewWrapper } from './ComponentStyles';

interface SectionProps {
  title: string;
  items: loanData[];
  error: Error[];
}

interface Error {
  id: string;
  isValid: boolean;
  message: string;
}

export const Section = ({ error, title, items }: SectionProps) => {
  const isInvalidItem = (id: string) => {
    const item = error?.find((invalidItem: Error) => invalidItem.id === id);
    return item ? !item.isValid : false;
  };

  return (
    <PreviewWrapper>
      <h4>{toTitleCase(title) + ' Details'}</h4>
      <div>
        {items.map((item, index) => (
          <>
            <div className="field-value" key={item.id} style={{}}>
              <div>{readableKeyString(item.id) + ' : '}</div>
              <div style={{ color: isInvalidItem(item.id) ? 'red' : 'inherit' }}>{item.value}</div>
            </div>
            {isInvalidItem(item.id) && (
              <div
                className="field-value"
                style={{ color: isInvalidItem(item.id) ? 'red' : 'inherit', fontSize: '8px' }}>
                {error[index]?.message}
              </div>
            )}
          </>
        ))}
      </div>
    </PreviewWrapper>
  );
};
