import { Stack, Typography } from '@/components/ui';
import { clsx } from '@/utils/helpers';
import cl from './Stepper.module.scss';

type Steps = { label: number | string; Content: () => JSX.Element };

interface StepperProps {
    currentStep: number;
    steps: Steps[];
    onStepClick: (step: number) => void;
}

export const Stepper = ({ currentStep, steps, onStepClick }: StepperProps) => {
    return (
        <ul className={cl.stepper}>
            <Stack.H align='start' justify='between' className={cl.steps}>
                {steps.map(({ label }, index) => (
                    <li className={cl.item} key={label}>
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
                                {label}
                            </Typography>
                        </Stack.V>
                    </li>
                ))}
            </Stack.H>
            <div className={cl.content}>
                {steps.map(
                    ({ Content }, index) =>
                        currentStep === index + 1 && <Content key={index} />
                )}
            </div>
        </ul>
    );
};
