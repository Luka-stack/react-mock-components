import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';

import { ReactPortal } from '../components/react-portal';

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: transparent;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
  color: #ffffff;
  border-radius: 0.375rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;

  &:hover {
    background-color: #292524;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  color: #ffffff;
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  transition: transform 0.2s linear;
  transform: scale(0.85);

  .dropdown-enter & {
    transform: scale(0.85);
  }

  .dropdown-enter-active & {
    transform: scale(1);
  }

  .dropdown-enter-done & {
    transform: scale(1);
  }

  .dropdown-exit & {
    transform: scale(1);
  }

  .dropdown-exit-active & {
    transform: scale(0.85);
  }
`;

const DropdownPosition = styled.div<{ $left: number; $top: number }>`
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;

  opacity: 0;
  transition: opacity 0.2s linear;

  ${({ $left, $top }) =>
    css`
      transform: translate(${$left}px, ${$top}px) translateX(-50%);

      &.dropdown-enter {
        opacity: 0;
      }

      &.dropdown-enter-active {
        opacity: 1;
      }

      &.dropdown-enter-done {
        opacity: 1;
      }

      &.dropdown-exit {
        opacity: 1;
      }

      &.dropdown-exit-active {
        opacity: 0;
      }
    `}
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const ActionHeader = styled.p`
  margin: 0;
  padding: 0.5rem 1rem;
  text-align: left;
`;

const Action = styled.button`
  background-color: transparent;
  color: #fff;
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  text-align: left;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #292524;
  }
`;

export default function DropdonwComponent() {
  const [open, setOpen] = useState(false);
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  return (
    <Page>
      {open ? <Backdrop onClick={() => setOpen(false)} /> : null}

      <DropdownMenu>
        <Button onClick={() => setOpen(true)} ref={(ref) => setTriggerRef(ref)}>
          Open
        </Button>

        {triggerRef ? (
          <DropdownContentComponent parent={triggerRef} isOpen={open} />
        ) : null}
      </DropdownMenu>
    </Page>
  );
}

function DropdownContentComponent({
  parent,
  isOpen,
}: {
  parent: HTMLButtonElement;
  isOpen: boolean;
}) {
  const [left, setLeft] = useState(() => {
    const rect = parent.getBoundingClientRect();
    return rect.left + rect.width / 2;
  });
  const [top, setTop] = useState(() => parent.getBoundingClientRect().bottom);

  useEffect(() => {
    const onResize = () => {
      const rect = parent.getBoundingClientRect();
      setLeft(rect.left + rect.width / 2);
      setTop(rect.bottom);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [parent]);

  return (
    <ReactPortal>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="dropdown"
        unmountOnExit
        onEnter={() => {
          console.log('Test');
        }}
      >
        <DropdownPosition $left={left} $top={top + 8}>
          <DropdownContent>
            <ActionHeader>My Account</ActionHeader>

            <Separator />

            <Action>Profile</Action>
            <Action>Billing</Action>
            <Action>Keyboard shortcuts</Action>

            <Separator />

            <Action>Team</Action>
            <Action>Invite users</Action>
            <Action>New Team</Action>

            <Separator />

            <Action>Log out</Action>
          </DropdownContent>
        </DropdownPosition>
      </CSSTransition>
    </ReactPortal>
  );
}
