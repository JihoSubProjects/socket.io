import { shallowMount } from '@vue/test-utils';

import ChatView from '@/views/ChatView.vue';
import routes from '@/router/routes';

jest.mock('@/utils/socket', () => {
  class MockedSocket {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callbacks: { [event: string]: (...args: any[]) => void };
    constructor() {
      this.callbacks = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: string, listener: (...args: any[]) => void) {
      this.callbacks[event] = listener;
      return this;
    }
    emit(event: string, arg: string) {
      console.log(arg);
      this.callbacks[event](arg);
    }
  }

  return jest.fn().mockImplementation(() => {
    return new MockedSocket();
  });
});

describe('Chat.vue', () => {
  test('"/chat" 경로가 routes 목록에 존재한다.', () => {
    const result = routes.find((route) => route.path === '/chat');
    expect(result).toBeTruthy();
  });

  test('"/chat" 접속 시 socket 객체가 자동으로 생성되어야 한다.', () => {
    const wrapper = shallowMount(ChatView);
    expect(wrapper.vm.socket).toBeTruthy();
  });

  test('메시지 입력 input과 메시지 내역 section을 렌더링 한다.', () => {
    const wrapper = shallowMount(ChatView);
    expect(wrapper.find('input.user-input').exists()).toBe(true);
    expect(wrapper.find('section.messages').exists()).toBe(true);
  });

  test('메시지 전송 시 socket.io 객체를 통해 메시지가 전송된다.', () => {
    const wrapper = shallowMount(ChatView);
    const message = 'Hello';
    wrapper.vm.userInput.value = message;
    wrapper.vm.submit();
    expect(wrapper.vm.userInput.value).toHaveLength(0);
    expect(wrapper.vm.messages).toHaveLength(1);
    expect(wrapper.vm.messages[0]).toEqual(message);
  });

  test('socket.io로부터 메시지를 받으면 해당 메시지를 메시지 내역 section에 렌더링 한다.', async () => {
    const wrapper = shallowMount(ChatView);
    const message = 'Hello';
    wrapper.vm.userInput.value = message;
    await wrapper.vm.submit();
    console.log(wrapper.text());
    expect(wrapper.text()).toMatch(message);
  });
});
