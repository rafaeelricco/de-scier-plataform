import { Author } from '@/mock/submit_new_document'
import { DocumentGetProps } from '@/services/document/getArticles'
import { Reorder } from 'framer-motion'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React from 'react'
import { Pencil, Trash } from 'react-bootstrap-icons'

export const AuthorsListDragabble: React.FC<AuthorsListDragabbleProps> = ({
   authors,
   article,
   onReorder,
   onDelete,
   onEdit
}: AuthorsListDragabbleProps) => {
   return (
      <React.Fragment>
         {article?.document.authorsOnDocuments ? (
            <React.Fragment>
               <Reorder.Group axis="y" values={authors} onReorder={onReorder}>
                  <div className="grid gap-2">
                     {article?.document.authorsOnDocuments?.map((item, index) => (
                        <Reorder.Item key={item.id} value={item} id={item.id}>
                           <div className="grid md:grid-cols-3 items-center px-0 py-3 rounded-md cursor-grab">
                              <div className="flex items-center gap-4">
                                 <div className="flex gap-0 items-center">
                                    <CircleIcon className="w-8" />
                                    <p className="text-sm text-blue-gray">{index + 1}º</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-secundary_blue-main font-semibold md:font-regular">{item.author?.name}</p>
                                    <div className="block md:hidden">
                                       <p className="text-sm text-secundary_blue-main">{item.author?.title}</p>
                                    </div>
                                    <div className="block md:hidden">
                                       <p className="text-sm text-secundary_blue-main">{item.author?.email}</p>
                                       {index !== 0 && (
                                          <React.Fragment>
                                             <div className="flex items-center gap-2">
                                                <Trash
                                                   className="fill-status-error w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                                   onClick={() =>
                                                      onDelete &&
                                                      onDelete({
                                                         email: item.author?.email || '',
                                                         id: item.id,
                                                         name: item.author?.name || '',
                                                         title: item.author?.title || ''
                                                      })
                                                   }
                                                />
                                                <Pencil
                                                   className="fill-primary-main w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                                   onClick={() =>
                                                      onEdit &&
                                                      onEdit({
                                                         email: item.author?.email || '',
                                                         id: item.id,
                                                         name: item.author?.name || '',
                                                         title: item.author?.title || ''
                                                      })
                                                   }
                                                />
                                             </div>
                                          </React.Fragment>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className="hidden md:block">
                                 <p className="text-sm text-secundary_blue-main">{item.author?.title}</p>
                              </div>
                              <div className="hidden md:flex items-center justify-between">
                                 <p className="text-sm text-secundary_blue-main">{item.author?.email}</p>
                                 {index !== 0 && (
                                    <React.Fragment>
                                       <div className="flex items-center gap-2">
                                          <Trash
                                             className="fill-status-error w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                             onClick={() =>
                                                onDelete &&
                                                onDelete({
                                                   email: item.author?.email || '',
                                                   id: item.id,
                                                   name: item.author?.name || '',
                                                   title: item.author?.title || ''
                                                })
                                             }
                                          />
                                          <Pencil
                                             className="fill-primary-main w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                             onClick={() =>
                                                onEdit &&
                                                onEdit({
                                                   email: item.author?.email || '',
                                                   id: item.id,
                                                   name: item.author?.name || '',
                                                   title: item.author?.title || ''
                                                })
                                             }
                                          />
                                       </div>
                                    </React.Fragment>
                                 )}
                              </div>
                           </div>
                        </Reorder.Item>
                     ))}
                  </div>
               </Reorder.Group>
            </React.Fragment>
         ) : (
            <React.Fragment>
               <Reorder.Group axis="y" values={authors} onReorder={onReorder}>
                  <div className="grid gap-2">
                     {authors.map((item, index) => (
                        <Reorder.Item key={item.id} value={item} id={item.id}>
                           <div className="grid md:grid-cols-3 items-center px-0 py-3 rounded-md cursor-grab">
                              <div className="flex items-center gap-4">
                                 <div className="flex gap-0 items-center">
                                    <CircleIcon className="w-8" />
                                    <p className="text-sm text-blue-gray">{index + 1}º</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-secundary_blue-main font-semibold md:font-regular">{item.name}</p>
                                    <div className="block md:hidden">
                                       <p className="text-sm text-secundary_blue-main">{item.title}</p>
                                    </div>
                                    <div className="block md:hidden">
                                       <p className="text-sm text-secundary_blue-main">{item.email}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="hidden md:block">
                                 <p className="text-sm text-secundary_blue-main">{item.title}</p>
                              </div>
                              <div className="hidden md:flex items-center justify-between">
                                 <p className="text-sm text-secundary_blue-main">{item.email}</p>
                                 {index !== 0 && (
                                    <React.Fragment>
                                       <div className="flex items-center gap-2">
                                          <Trash
                                             className="fill-status-error w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                             onClick={() => onDelete && onDelete(item)}
                                          />
                                          <Pencil
                                             className="fill-primary-main w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                             onClick={() => onEdit && onEdit(item)}
                                          />
                                       </div>
                                    </React.Fragment>
                                 )}
                              </div>
                           </div>
                        </Reorder.Item>
                     ))}
                  </div>
               </Reorder.Group>
            </React.Fragment>
         )}
      </React.Fragment>
   )
}

interface AuthorsListDragabbleProps {
   article: DocumentGetProps | null
   authors: Author[]
   onReorder: (newOrder: any[]) => void
   onDelete?: (author: Author) => void
   onEdit?: (author: Author) => void
}
