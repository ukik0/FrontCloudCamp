import { useDispatch } from 'react-redux';
import { getCurrentStep, StatusActions } from '@/store/slices/status';
import { Stepper } from '@/components';
import { useTypedSelector } from '@/utils/hooks';
import { Steps } from './Steps';

const STEPS = [
    { label: 1, Content: Steps.Info },
    { label: 2, Content: Steps.Advantages },
    { label: 3, Content: Steps.About }
];

const CreatePage = () => {
    const dispatch = useDispatch();

    const currentStep = useTypedSelector(getCurrentStep);

    return (
        <Stepper
            onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
            currentStep={currentStep}
            steps={STEPS}
        />
    );
};

export default CreatePage;
