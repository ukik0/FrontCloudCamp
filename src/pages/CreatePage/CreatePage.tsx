import { Steps } from './Steps';
import { useDispatch } from 'react-redux';
import { Stepper } from '@/components';
import { useTypedSelector } from '@/utils/hooks';
import { getCurrentStep, StatusActions } from '@/store/slices/status';

const CreatePage = () => {
    const currentStep = useTypedSelector(getCurrentStep);
    const dispatch = useDispatch();

    return (
        <Stepper
            onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
            currentStep={currentStep}
            steps={[
                { label: 1, Content: Steps.Info },
                { label: 2, Content: Steps.Advantages },
                { label: 3, Content: Steps.About }
            ]}
        />
    );
};

export default CreatePage;
