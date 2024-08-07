import '~/styles.css';

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown, DefaultInput } from '~/components/dropdown';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    children: ({ isOpen, onClick }) => (
      <button type="button" onClick={onClick}>
        {isOpen ? 'Close dropdown' : 'Open dropdown'}
      </button>
    ),
  },
  argTypes: {
    containerWidth: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <Dropdown {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      onSelect: () => action('option:onSelect')('Option 2 clicked'),
    },
    {
      label: 'Option 3',
      onSelect: () => action('option:onSelect')('Option 3 clicked'),
    },
  ],
};

export const WithSubmenu = Template.bind({});
WithSubmenu.args = {
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      onSelect: () => action('option:onSelect')('Option 2 clicked'),
      items: [
        {
          label: 'Option 2.1',
          onSelect: () => action('option:onSelect')('Option 2.1 clicked'),
          items: [
            {
              label: 'Option 2.1.1',
              onSelect: () => action('option:onSelect')('Option 2.1.1 clicked'),
            },
          ],
        },
        {
          label: 'Option 2.2',
          onSelect: () => action('option:onSelect')('Option 2.2 clicked'),
        },
        {
          label: 'Option 2.3',
          onSelect: () => action('option:onSelect')('Option 2.3 clicked'),
          items: [
            {
              label: 'Option 2.3.1',
              onSelect: () => action('option:onSelect')('Option 2.3.1 clicked'),
            },
          ],
        },
      ],
    },
    {
      label: 'Option 3',
      onSelect: () => action('option:onSelect')('Option 3 clicked'),
    },
  ],
};

export const DisabledItem = Template.bind({});
DisabledItem.args = {
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Disabled Option 2',
      disabled: true,
      onSelect: () => action('option:onSelect')('Option 2 clicked'),
    },
    {
      label: 'Option 3',
      onSelect: () => action('option:onSelect')('Option 3 clicked'),
    },
  ],
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      renderInput: DefaultInput,
      debounce: 25,
      items: [
        {
          label: 'Option 2.1',
          onSelect: () => action('option:onSelect')('Option 2.1 clicked'),
          iconAfter: <span>👍</span>,
        },
        {
          label: 'Option 2.2',
          onSelect: () => action('option:onSelect')('Option 2.2 clicked'),
        },
      ],
    },
  ],
};

export const WithSearchLong = Template.bind({});
WithSearchLong.args = {
  closeOnScroll: false,
  maxHeight: 300,
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      renderInput: DefaultInput,
      debounce: 25,
      iconAfter: <span>👍</span>,
      className: 'long',
      items: Array.from({ length: 500 })
        .fill(null)
        .map((_, index) => ({
          label: `Option 2.${index}`,
          onSelect: () => action('option:onSelect')(`Option 2.${index} clicked`),
        })),
    },
  ],
};

export const DoNotCloseOnSelect = Template.bind({});
DoNotCloseOnSelect.args = {
  closeOnSelect: false,
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      renderInput: DefaultInput,
      debounce: 25,
      iconAfter: <span>👍</span>,
      className: 'long',
      items: Array.from({ length: 500 })
        .fill(null)
        .map((_, index) => ({
          label: `Option 2.${index}`,
          onSelect: () => action('option:onSelect')(`Option 2.${index} clicked`),
        })),
    },
  ],
};

export const SearchManyLevels = Template.bind({});
SearchManyLevels.args = {
  items: [
    {
      label: 'Option 1',
      onSelect: () => action('option:onSelect')('Option 1 clicked'),
      renderInput: DefaultInput,
    },
    {
      label: 'Option 2',
      onSelect: () => action('option:onSelect')('Option 2 clicked'),
      renderInput: DefaultInput,
      items: [
        {
          label: 'Option 2.1',
          onSelect: () => action('option:onSelect')('Option 2.1 clicked'),
          renderInput: DefaultInput,
          items: [
            {
              label: 'Option 2.1.1',
              onSelect: () => action('option:onSelect')('Option 2.1.1 clicked'),
            },
          ],
        },
        {
          label: 'Option 2.2',
          onSelect: () => action('option:onSelect')('Option 2.2 clicked'),
          renderInput: DefaultInput,
        },
        {
          label: 'Option 2.3',
          onSelect: () => action('option:onSelect')('Option 2.3 clicked'),
          renderInput: DefaultInput,
          items: [
            {
              label: 'Option 2.3.1',
              onSelect: () => action('option:onSelect')('Option 2.3.1 clicked'),
              renderInput: DefaultInput,
              items: [
                {
                  label: 'Option 2.3.1.1',
                  onSelect: () => action('option:onSelect')('Option 2.3.1.1 clicked'),
                  renderInput: DefaultInput,
                },
                {
                  label: 'Option 2.3.1.2',
                  onSelect: () => action('option:onSelect')('Option 2.3.1.2 clicked'),
                  renderInput: DefaultInput,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Option 3',
      onSelect: () => action('option:onSelect')('Option 3 clicked'),
      renderInput: DefaultInput,
    },
  ],
};
