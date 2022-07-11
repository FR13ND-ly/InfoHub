import { TimeForReadPipe } from "./time-for-read.pipe"

describe('TimesForReadPipe', () => {
    const pipe = new TimeForReadPipe
    
    it ('transform in seconds', () => {
        expect(pipe.transform(42)).toBe('42s')
    })

    it ('transform in minutes', () => {
        expect(pipe.transform(420)).toBe('7min ')
    })

    it ('transform in minutes and seconds', () => {
        expect(pipe.transform(469)).toBe('7min 49s')
    })

    it ('transform in hours', () => {
        expect(pipe.transform(3669)).toBe('ore...')
    })

    it ('negative number', () => {
        expect(() => pipe.transform(-2)).toThrowError('Positive numbers required')
    })
})