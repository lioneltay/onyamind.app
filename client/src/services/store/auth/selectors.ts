import { State as StoreState } from "services/store"
import { State } from "./reducer"
import { notNil } from "lib/utils"

const slice = (state: StoreState): State => state.listPage

export const user = (state: StoreState) => slice(state).user
