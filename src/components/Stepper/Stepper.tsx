import { Stack, Typography } from '@/components/ui';
import { clsx } from '@/utils/helpers';
import cl from './Stepper.module.scss';

interface StepperProps {
    currentStep: number;
    steps: number[] | string[];
    onStepClick: (step: number) => void;
}

export const Stepper = ({ currentStep, steps, onStepClick }: StepperProps) => {
    return (
        <ul className={cl.stepper}>
            <Stack.H align='start' justify='between'>
                {steps.map((step, index) => (
                    <li className={cl.item} key={step}>
                        <div
                            className={clsx({
                                cls: cl.line,
                                mods: {
                                    [cl.active]: index + 1 <= currentStep - 1
                                }
                            })}
                        />
                        <Stack.V gap='16'>
                            <div
                                className={clsx({
                                    cls: cl.circle,
                                    mods: {
                                        [cl.active]: index + 1 === currentStep,
                                        [cl.success]:
                                            index + 1 <= currentStep - 1
                                    }
                                })}
                                onClick={() => onStepClick(index + 1)}
                            />
                            <Typography
                                variant='title-2'
                                className={cl.currentStep}
                            >
                                {step}
                            </Typography>
                        </Stack.V>
                    </li>
                ))}
            </Stack.H>
        </ul>
    );
};
