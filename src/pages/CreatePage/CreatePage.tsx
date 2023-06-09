import { Stepper as StepForm } from '@/components';
import { Steps } from '@/pages/CreatePage/Steps';
import { useTypedSelector } from '@/utils/hooks';
import { useDispatch } from 'react-redux';
import { getCurrentStep, StatusActions } from '@/store/slices/status';
import { useCallback } from 'react';

const CreatePage = () => {
    return (
        <>
            <Stepper />
            <StepInfo />
            <StepAdvantages />
            <StepAbout />
        </>
    );
};

export default CreatePage;

const Stepper = () => {
    const currentStep = useTypedSelector(getCurrentStep);
    const dispatch = useDispatch();

    return (
        <StepForm
            onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
            currentStep={currentStep}
            steps={[1, 2, 3]}
        />
    );
};

const StepInfo = () => {
    const currentStep = useTypedSelector(getCurrentStep);
    const dispatch = useDispatch();

    const nextStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep + 1));
    }, [currentStep]);

    if (currentStep === 1) {
        return <Steps.Info next={nextStepHandler} />;
    }
};

const StepAdvantages = () => {
    const currentStep = useTypedSelector(getCurrentStep);
    const dispatch = useDispatch();

    const nextStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep + 1));
    }, [currentStep]);

    const prevStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep - 1));
    }, [currentStep]);

    if (currentStep === 2) {
        return (
            <Steps.Advantages next={nextStepHandler} prev={prevStepHandler} />
        );
    }
};

const StepAbout = () => {
    const currentStep = useTypedSelector(getCurrentStep);
    const dispatch = useDispatch();

    const prevStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep - 1));
    }, [currentStep]);

    if (currentStep === 3) {
        return <Steps.About prev={prevStepHandler} />;
    }
};
