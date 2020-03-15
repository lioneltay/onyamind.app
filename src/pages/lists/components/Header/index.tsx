import React, { Fragment } from "react"
import { noopTemplate as css } from "lib/utils"

import { IconButton } from "@material-ui/core"
import { SwapHoriz, Add, Check, Delete } from "@material-ui/icons"

import IconButtonMenu from "lib/components/IconButtonMenu"
import TaskAdder from "./TaskAdder"
import HeaderBase from "components/HeaderBase"

import { useSelector, useActions } from "services/store"

export default () => {
  const {
    taskLists,
    allSelectedTasksComplete,
    allSelectedTasksIncomplete,
    selectedTaskList,
  } = useSelector((state, s) => ({
    taskLists: s.listPage.taskLists(state) || [],
    allSelectedTasksComplete: s.listPage.allSelectedTasksComplete(state),
    allSelectedTasksIncomplete: s.listPage.allSelectedTasksInComplete(state),
    selectedTaskList: s.listPage.selectedTaskList(state),
  }))

  const {
    listPage: {
      completeSelectedTasks,
      decompleteSelectedTasks,
      archiveSelectedTasks,
      moveSelectedTasks,
    },
  } = useActions()

  return (
    <header
      css={css`
        position: sticky;
        top: 0;
        z-index: 1000;
      `}
    >
      <HeaderBase
        title={selectedTaskList?.name ?? ""}
        editingActions={
          <Fragment>
            {allSelectedTasksComplete || allSelectedTasksIncomplete ? (
              <IconButton
                onClick={
                  allSelectedTasksIncomplete
                    ? completeSelectedTasks
                    : decompleteSelectedTasks
                }
              >
                {allSelectedTasksIncomplete ? <Check /> : <Add />}
              </IconButton>
            ) : null}

            <IconButtonMenu
              icon={<SwapHoriz />}
              items={taskLists.map(list => ({
                label: list.name,
                action: () => moveSelectedTasks({ listId: list.id }),
              }))}
            />

            <IconButton onClick={archiveSelectedTasks}>
              <Delete />
            </IconButton>
          </Fragment>
        }
      />
      <TaskAdder />
    </header>
  )
}
