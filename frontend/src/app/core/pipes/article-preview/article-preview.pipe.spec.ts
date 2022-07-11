import { ArticlePreviewPipe } from './article-preview.pipe';

describe('TimesForReadPipe', () => {
  const pipe = new ArticlePreviewPipe();

  it('should crop text', () => {
    expect(
      pipe.transform(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Venenatis cras sed felis eget. Justo donec enim diam vulputate ut pharetra sit. Leo a diam sollicitudin tempor id. Id neque aliquam vestibulum morbi blandit cursus risus. Hac habitasse platea dictumst vestibulum rhoncus. Bibendum enim facilisis gravida neque convallis. Velit egestas dui id ornare arcu odio ut. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Leo vel orci porta non. Viverra maecenas accumsan lacus vel facilisis volutpat est velit. Vitae semper quis lectus nulla at volutpat diam ut. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Arcu ac tortor dignissim convallis`,
        45
      )
    ).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et netus et malesuada fames ac turpis egestas maecenas...'
    );
  });

  it('should crop text', () => {
    expect(
      pipe.transform(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Venenatis cras sed felis eget. Justo donec enim diam vulputate ut pharetra sit. Leo a diam sollicitudin tempor id. Id neque aliquam vestibulum morbi blandit cursus risus. Hac habitasse platea dictumst vestibulum rhoncus. Bibendum enim facilisis gravida neque convallis. Velit egestas dui id ornare arcu odio ut. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Leo vel orci porta non. Viverra maecenas accumsan lacus vel facilisis volutpat est velit. Vitae semper quis lectus nulla at volutpat diam ut. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Arcu ac tortor dignissim convallis`,
        45
      )
    ).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et netus et malesuada fames ac turpis egestas maecenas...'
    );
  });

  it('should not crop text', () => {
    expect(
      pipe.transform(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor`,
        45
      )
    ).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    );
  });

  it('should throw error', () => {
    expect(() => pipe.transform('', -2)).toThrowError('Positive numbers required')
  })
});
